import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  deckLoader = [new Subject(), new Subject()];
  deck$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  deck: any[] = [null, null];

  save(deck, wavesurfer) {
    console.log('saved');
    this.deck[deck] = wavesurfer;
    this.deckLoader[deck].next(this.deck[deck]);
  }
  setVolume(deck, volume) {
    this.deck[deck].setVolume(volume);
  }
  on(deck, event, callback) {
    this.deck[deck].on(event, callback);
  }
  load(deck, song) {
    this.deck[deck].load(song);
  }
  playPause(deck) {
    this.deck[deck].playPause();
  }
  isPlaying(deck) {
    return this.deck[deck].isPlaying();
  }
}
