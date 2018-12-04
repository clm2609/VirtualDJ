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
      const filter0 = this.eq[0].map(band => {
        const filter = this.deck[0].backend.ac.createBiquadFilter();
        filter.type = band.type;
        filter.gain.value = band.value;
        filter.Q.value = 1;
        filter.frequency.value = band.f;
        return filter;
      });
      const filter1 = this.eq[1].map(band => {
        const filter = this.deck[1].backend.ac.createBiquadFilter();
        filter.type = band.type;
        filter.gain.value = band.value;
        filter.Q.value = 1;
        filter.frequency.value = band.f;
        return filter;
      });
      return [filter0, filter1];
    }
  }

  saveEQ(eq) {
    this.eq = eq;
    this.eqEffect = this.equalizer();
    this.applyEffects();
  }
  saveEffects(deck, i, effect) {
    this.effects[deck][i] = effect;
  }
  activateEffect(deck, i) {
    this.effects[deck][i].active = !this.effects[deck][i].active;
    const effects = this.effects[deck].filter(a => a.active);
    const tuna = new Tuna(this.deck[deck].backend.ac);
    this.activeEffects[deck] = [];
    for (const effect of effects) {
      this.activeEffects[deck].push(new tuna[effect.type](effect.config));
    }
    this.applyEffects();
    return this.effects[deck][i].active;
  }
}
