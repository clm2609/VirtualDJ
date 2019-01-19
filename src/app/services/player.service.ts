import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Tuna from 'tunajs';
import { EffectsService } from './effects.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  deckLoader = [new Subject(), new Subject()];
  deck$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  effectLoader = [new Subject(), new Subject()];
  effects$ = [this.effectLoader[0].asObservable(), this.effectLoader[1].asObservable()];
  deck: any[] = [null, null];
  eq = [null, null];
  eqEffect: any;
  effectsNum = 6;
  deckNum = 2;
  effects = [[null, null, null, null, null, null], [null, null, null, null, null, null]];
  activeEffects = [[], []];
  constructor(private effectServ: EffectsService) {
    for (let i = 0; i < this.effectsNum; i++) {
      this.saveEffects(0, i, this.effectServ.getEffects()[i]);
      this.saveEffects(1, i, this.effectServ.getEffects()[i]);
    }
  }
  save(deck, wavesurfer) {
    this.deck[deck] = wavesurfer;
    this.deckLoader[deck].next(this.deck[deck]);
    this.eqEffect = this.equalizer();
    this.applyEffects();
  }
  setVolume(deck, volume) {
    this.deck[deck].setVolume(volume);
  }
  setPitch(deck, playback) {
    this.deck[deck].setPlaybackRate(playback);
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
  applyEffects() {
    if (this.eqEffect) {
      this.deck[0].backend.setFilters(this.eqEffect[0].concat(this.activeEffects[0]));
      this.deck[1].backend.setFilters(this.eqEffect[1].concat(this.activeEffects[1]));
    }
  }

  equalizer() {
    if (this.deck[0] && this.deck[1] && this.eq[0] && this.eq[1]) {
      return this.effectServ.createEQEffect(this.deck, this.eq);
    }
  }

  saveEQ(eq) {
    this.eq = eq;
    this.eqEffect = this.equalizer();
    this.applyEffects();
  }
  saveEffects(deck, i, effect) {
    if (this.effects[deck][i] && this.effects[deck][i].active) {
      this.activateEffect(deck, i);
    }
    this.effects[deck][i] = effect;
    this.effectLoader[deck].next(this.effects[deck]);
  }
  activateEffect(deck, i) {
    this.effects[deck][i].active = !this.effects[deck][i].active;
    const effects = this.effects[deck].filter(a => a.active);
    this.activeEffects[deck] = this.effectServ.createEffects(this.deck[deck].backend.ac, effects);
    this.applyEffects();
    this.effectLoader[deck].next(this.effects[deck]);
  }
  getCurrentTime(deck) {
    return this.deck[deck].getCurrentTime();
  }
  getDuration(deck) {
    return this.deck[deck].getDuration();
  }
  playFromPosition(deck, start) {
    this.deck[deck].seekAndCenter(start);
  }
}
