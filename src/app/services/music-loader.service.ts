import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MusicLoaderService {
  newSong: any;
  music = [];
  decksong = [null, null];
  load(deck, song) {
    this.decksong[deck] = song;
  }
  addSong(song: any) {
    this.music.push(song);
  }
  deleteSong(i) {
    this.music.splice(i, 1);
  }
}
