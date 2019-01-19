import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';
import * as WaveSurfer from 'wavesurfer.js';
import * as Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

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
  effects = [{}, {}, {}, {}, {}, {}] as any;
  pitch = 0;
  cues = [];
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
            })
          ]
        })
      );
      this.playerService.on(this.deckNumber, 'finish', () => {
        this.resetDisc();
      });
    });
    this.musicSubscription = this.musicService.decksongs$[this.deckNumber].subscribe(a => {
      this.resetDisc();
      this.resetCUE();
      this.resetPitch();
      this.song = a as File;
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
    const cue = {};
    console.log(this.playerService.getCurrentTime(this.deckNumber));
    console.log(this.playerService.getDuration(this.deckNumber));
    cue['percent'] =
      (this.playerService.getCurrentTime(this.deckNumber) / this.playerService.getDuration(this.deckNumber)) * 100;
    cue['pos'] = this.playerService.getCurrentTime(this.deckNumber) / this.playerService.getDuration(this.deckNumber);
    if (this.cues.length === 4) {
      this.cues.shift();
    }
    this.cues.push(cue);
  }
  startCUE(cue) {
    this.playerService.playFromPosition(this.deckNumber, this.cues[cue].pos);
  }
  resetCUE() {
    this.cues = [];
  }
}
