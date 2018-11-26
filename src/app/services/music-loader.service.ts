import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicLoaderService {
  deckLoader = [new Subject(), new Subject()];
  deck$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  deck: File[] = [null, null];

  load(deck, wavesurfer) {
    this.deck[deck] = wavesurfer;
    this.deckLoader[deck].next(this.deck[deck]);
  }
}
