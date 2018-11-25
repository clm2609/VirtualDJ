import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
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
  rotation = 0;
  private active = false;
  song: any;
  wavesurfer: any;
  constructor(musicService: MusicLoaderService) {
    this.musicService = musicService;
  }
  ngOnInit() {
    setInterval(() => {
      this.rotate();
    }, 50);
  }
  ngAfterViewInit(): void {
    const height = document.getElementById('deck_' + this.deckNumber + '_wave').offsetHeight;
    requestAnimationFrame(() => {
      this.wavesurfer = WaveSurfer.create({
        container: '#deck_' + this.deckNumber + '_wave',
        waveColor: 'red',
        progressColor: 'purple',
        height: height
      });
      this.wavesurfer.on('finish', () => {
        this.finishSong();
      });
    });
    this.musicSubscription = this.musicService.decksongs$[this.deckNumber].subscribe(a => {
      const song = a as File;
      requestAnimationFrame(() => {
        const reader = new FileReader();
        reader.readAsDataURL(song);
        reader.onload = () => {
          this.wavesurfer.load(reader.result);
        };
        reader.onerror = error => {
          console.log('Error: ', error);
        };
      });
    });
  }
  rotate() {
    if (this.active) {
      this.rotation = (this.rotation + 10) % 360;
    }
  }
  finishSong() {
    this.active = false;
    this.rotation = 0;
  }
  ngOnDestroy(): void {
    this.musicSubscription.unsubscribe();
  }
  playPause() {
    this.wavesurfer.playPause();
    this.active = this.wavesurfer.isPlaying();
  }
}
