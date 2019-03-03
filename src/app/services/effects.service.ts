import { Injectable } from '@angular/core';
import Tuna from 'tunajs';
import { baseEffects } from '../data/baseEffects';

@Injectable({
  providedIn: 'root'
})
export class EffectsService {
  effects = baseEffects;
  getEffects() {
    return JSON.parse(JSON.stringify(this.effects));
  }
  addEffect(effect) {
    effect.id = this.effects.reduce((valorAnterior, valorActual) => Math.max(valorAnterior, valorActual.id), 0) + 1;
    this.effects.push(effect);
    localStorage.setItem('effects', JSON.stringify(this.effects));
  }

  removeEffect(id) {
    this.effects = this.effects.filter(effect => effect.id !== Number(id));
    localStorage.setItem('effects', JSON.stringify(this.effects));
  }
  createEffects(ac, effects) {
    const tuna = new Tuna(ac);
    const preparedEffects = [];
    for (const effect of effects) {
      preparedEffects.push(new tuna[effect.type](effect.config));
    }
    return preparedEffects;
  }
  constructor() {
    if (localStorage.getItem('effects')) {
      this.effects = JSON.parse(localStorage.getItem('effects'));
    } else {
      localStorage.setItem('effects', JSON.stringify(this.effects));
    }
  }
}
