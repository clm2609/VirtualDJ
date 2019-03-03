import { Injectable } from '@angular/core';
import Tuna from 'tunajs';
import { baseEffects } from '../data/baseEffects';

@Injectable({
  providedIn: 'root'
})
export class EQService {
  createEQ(bass, mid, trebble) {
    const adjustEQValue = value => {
      if (value > 0) {
        return value / 5;
      }
      return value;
    };
    const EQ = [
      {
        f: 32,
        type: 'lowshelf',
        value: adjustEQValue(bass)
      },
      {
        f: 64,
        type: 'peaking',
        value: adjustEQValue(bass)
      },
      {
        f: 125,
        type: 'peaking',
        value: adjustEQValue(bass)
      },
      {
        f: 250,
        type: 'peaking',
        value: adjustEQValue(bass)
      },
      {
        f: 500,
        type: 'peaking',
        value: adjustEQValue(0.75 * bass + 0.25 * mid)
      },
      {
        f: 1000,
        type: 'peaking',
        value: adjustEQValue(0.75 * mid + 0.25 * bass)
      },
      {
        f: 2000,
        type: 'peaking',
        value: adjustEQValue(0.75 * mid + 0.25 * trebble)
      },
      {
        f: 4000,
        type: 'peaking',
        value: adjustEQValue(0.75 * trebble + 0.25 * mid)
      },
      {
        f: 8000,
        type: 'peaking',
        value: adjustEQValue(trebble)
      },
      {
        f: 16000,
        type: 'highshelf',
        value: adjustEQValue(trebble)
      }
    ];
    return EQ;
  }
  createEQEffect(deck, eq) {
    const filter0 = eq[0].map(band => {
      const filter = deck[0].backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = band.value;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });
    const filter1 = eq[1].map(band => {
      const filter = deck[1].backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = band.value;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });
    return [filter0, filter1];
  }
}
