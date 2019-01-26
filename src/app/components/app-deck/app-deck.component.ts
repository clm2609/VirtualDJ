import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';
import * as WaveSurfer from 'wavesurfer.js';
import * as Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import * as Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';

@Component({
  selector: 'app-deck',
  templateUrl: './app-deck.component.html',
  styleUrls: ['./app-deck.component.css']
})
export class AppDeckComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  deckNumber: number;
  private musicSubscription: Subscription;
  rotation = 0;
  private active = false;
  song: any;
  bpm: any;
  beats: any;
  effects = [{}, {}, {}, {}, {}, {}] as any;
  pitch = 0;
  cues = [];
  activeLoop: any;
  activeLoopRegion: any;
  loops = [0.25, 0.5, 1, 2, 4, 8, 16];
  actualLoop = 2;
  showedLoops = 3;
  lastLoopStart: any;
  lastLoopEnd: any;
  loopChanger: any;
  constructor(private musicService: MusicLoaderService, private playerService: PlayerService) {}
  ngOnInit() {
    setInterval(() => {
      this.rotate();
    }, 50);
    this.playerService.effects$[this.deckNumber].subscribe(effects => {
      const eff = effects as any;
      this.effects = eff.filter(_ => true);
    });
  }
  ngAfterViewInit(): void {
    const height = document.getElementById('deck_' + this.deckNumber + '_wave').offsetHeight;
    requestAnimationFrame(() => {
      this.playerService.save(
        this.deckNumber,
        WaveSurfer.create({
          container: '#deck_' + this.deckNumber + '_wave',
          waveColor: 'red',
          progressColor: 'purple',
          height: height,
          plugins: [
            Cursor.create({
              showTime: true,
              opacity: 1,
              customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                height: height,
                'font-size': '10px'
              }
            }),
            Regions.create({
              regions: []
            })
          ]
        })
      );
      this.playerService.on(this.deckNumber, 'finish', () => {
        this.resetDisc();
      });
    });
    this.musicSubscription = this.musicService.decksongs$[this.deckNumber].subscribe(a => {
      const data = a as any;
      this.resetDisc();
      this.resetCUE();
      this.resetPitch();
      this.song = data.song as File;
      this.bpm = data.bpm;
      this.beats = data.beats.reverse();
    });
  }
  rotate() {
    if (this.active) {
      this.rotation = (this.rotation + (10 * (100 + this.pitch)) / 100) % 360;
    }
  }
  resetDisc() {
    this.active = false;
    this.rotation = 0;
  }
  ngOnDestroy(): void {
    this.musicSubscription.unsubscribe();
  }
  playPause() {
    this.playerService.playPause(this.deckNumber);
    this.active = this.playerService.isPlaying(this.deckNumber);
  }
  applyEffect(i) {
    this.playerService.activateEffect(this.deckNumber, i);
  }
  changePitch() {
    const deck = this.deckNumber;
    this.playerService.setPitch(deck, (100 + this.pitch) / 100);
  }
  resetPitch() {
    const deck = this.deckNumber;
    this.pitch = 0;
    this.playerService.setPitch(deck, 1);
  }
  addCUE() {
    if (this.song) {
      const cue = {};
      cue['percent'] =
        (this.playerService.getCurrentTime(this.deckNumber) / this.playerService.getDuration(this.deckNumber)) * 100;
      cue['pos'] = this.playerService.getCurrentTime(this.deckNumber) / this.playerService.getDuration(this.deckNumber);
      if (this.cues.length === 4) {
        this.cues.shift();
      }
      this.cues.push(cue);
    }
  }
  startCUE(cue) {
    this.playerService.playFromPosition(this.deckNumber, this.cues[cue].pos);
  }
  resetCUE() {
    this.cues = [];
  }
  createLoop(loop) {
    if (this.song) {
      const currentTIme = this.playerService.getCurrentTime(this.deckNumber);
      const index = this.beats.findIndex(e => e <= currentTIme);
      console.log(this.activeLoop);
      if (!this.activeLoop) {
        this.activeLoop = loop;
        const start = this.beats[index];
        this.lastLoopStart = start;
        const end =
          loop >= 1 ? this.beats[index - loop] : this.beats[index] + (this.beats[index - 1] - this.beats[index]) * loop;
        this.lastLoopEnd = end;
        this.activeLoopRegion = this.playerService.createLoop(this.deckNumber, start, end);
      } else if (this.activeLoop !== loop) {
        console.log('enter sandman');
        this.resetLoop();
        this.playerService.getInstance(this.deckNumber).on('audioprocess', () => {
          if (this.playerService.getCurrentTime(this.deckNumber) >= this.lastLoopEnd) {
            this.activeLoop = loop;
            const start = this.lastLoopStart;
            const indx = this.beats.findIndex(e => e <= this.lastLoopStart);
            const end =
              loop >= 1 ? this.beats[indx - loop] : this.beats[indx] + (this.beats[indx - 1] - this.beats[indx]) * loop;
            this.lastLoopEnd = end;
            this.activeLoopRegion = this.playerService.createLoop(this.deckNumber, start, end);
            this.playerService.playFromPosition(
              this.deckNumber,
              start / this.playerService.getDuration(this.deckNumber)
            );
            this.playerService.getInstance(this.deckNumber).un('audioprocess');
          }
        });
      } else {
        this.resetLoop();
      }
    }
  }
  resetLoop() {
    if (this.activeLoopRegion) {
      this.activeLoopRegion.remove();
      this.activeLoopRegion = null;
    }
    this.activeLoop = null;
  }
  moveLoop(step) {
    if (!(this.actualLoop + step + this.showedLoops > this.loops.length || this.actualLoop + step < 0)) {
      this.actualLoop += step;
    }
  }
}
