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

  load(deck, i) {
    this.decksongs[deck] = this.music[i];
    this.deckLoader[deck].next(this.decksongs[deck]);
  }
  addSong(song: File) {
    this.music.push(song);
    this.musicLoader.next(this.music);
  }
  deleteSong(i) {
    this.music.splice(i, 1);
    this.musicLoader.next(this.music);
  }
}
