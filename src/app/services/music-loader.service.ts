import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from './player.service';
@Injectable({
  providedIn: 'root'
})
export class MusicLoaderService {
  musicLoader = new Subject();
  music$ = this.musicLoader.asObservable();
  music: File[] = [];
  deckLoader = [new Subject(), new Subject()];
  decksongs$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  decksongs: File[] = [null, null];
  playerService: PlayerService;
  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }
  load(deck, song) {
    this.decksongs[deck] = song;
    this.deckLoader[deck].next(this.decksongs[deck]);
    requestAnimationFrame(() => {
      const reader = new FileReader();
      reader.readAsDataURL(song);
      reader.onload = () => {
        this.playerService.load(deck, reader.result);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    });
  }
  addSong(song: File) {
    this.music.push(song);
    this.musicLoader.next(this.music);
  }
  deleteSong(song) {
    this.music.splice(this.music.indexOf(song), 1);
    this.musicLoader.next(this.music);
  }
}
