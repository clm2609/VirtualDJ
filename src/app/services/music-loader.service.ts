import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError, forkJoin } from 'rxjs';

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

  load(deck, song) {
    this.decksongs[deck] = song;
    this.deckLoader[deck].next(this.decksongs[deck]);
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
