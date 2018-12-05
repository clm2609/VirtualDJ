import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';
import * as WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-deck',
  templateUrl: './app-deck.component.html',
  styleUrls: ['./app-deck.component.css']
})
export class AppDeckComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  deckNumber: number;
  private musicSubscription: Subscription;
  musicService: MusicLoaderService;
  playerService: PlayerService;
  rotation = 0;
  private active = false;
  song: any;
  effects = [{}, {}, {}, {}, {}, {}] as any;
  constructor(musicService: MusicLoaderService, playerService: PlayerService) {
    this.musicService = musicService;
    this.playerService = playerService;
  }
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
          height: height
        })
      );
      this.playerService.on(this.deckNumber, 'finish', () => {
        this.resetDisc();
      });
    });
    this.musicSubscription = this.musicService.decksongs$[this.deckNumber].subscribe(a => {
      this.resetDisc();
      this.song = a as File;
    });
  }
  rotate() {
    if (this.active) {
      this.rotation = (this.rotation + 10) % 360;
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
}
