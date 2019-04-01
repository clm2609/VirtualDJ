/**
  This file is part of Web Virtual DJ.

Web Virtual DJ is free software: you can redistribute it and / or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

Web Virtual DJ is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
along with Web Virtual DJ.If not, see < https://www.gnu.org/licenses/>.
*/
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
