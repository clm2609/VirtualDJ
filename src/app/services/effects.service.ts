import { Injectable } from '@angular/core';
import Tuna from 'tunajs';

@Injectable({
  providedIn: 'root'
})
export class EffectsService {
  effects = [
    {
      name: 'Basic moog filter',
      type: 'MoogFilter',
      id: 1,
      active: false,
      config: {
        cutoff: 0.065, // 0 to 1
        resonance: 3.5, // 0 to 4
        bufferSize: 4096 // 256 to 16384
      }
    },
    {
      name: 'Basic ping pong',
      type: 'PingPongDelay',
      id: 2,
      active: false,
      config: {
        cutoff: 0.065, // 0 to 1
        resonance: 3.5, // 0 to 4
        bufferSize: 4096 // 256 to 16384
      }
    },
    {
      name: 'Basic left panner',
      type: 'Panner',
      id: 3,
      active: false,
      config: {
        pan: -1 // -1 (left) to 1 (right)
      }
    },
    {
      name: 'Basic right panner',
      type: 'Panner',
      id: 4,
      active: false,
      config: {
        pan: 1 // -1 (left) to 1 (right)
      }
    },
    {
      name: 'Basic bitcrusher',
      type: 'Bitcrusher',
      id: 0,
      active: false,
      config: {
        bits: 4, // 1 to 16
        normfreq: 0.1, // 0 to 1
        bufferSize: 4096 // 256 to 16384
      }
    },
    {
      name: 'Basic phaser',
      type: 'Phaser',
      id: 5,
      active: false,
      config: {
        rate: 1.2, // 0.01 to 8 is a decent range, but higher values are possible
        depth: 0.3, // 0 to 1
        feedback: 0.2, // 0 to 1+
        stereoPhase: 30, // 0 to 180
        baseModulationFrequency: 700, // 500 to 1500
        bypass: 0
      }
    }
  ];
  getEffects() {
    return JSON.parse(JSON.stringify(this.effects));
  }
  addEffect(effect) {
    effect.id = this.effects.reduce((valorAnterior, valorActual) => Math.max(valorAnterior, valorActual.id), 0) + 1;
    this.effects.push(effect);
  }
  createEffects(ac, effects) {
    const tuna = new Tuna(ac);
    const preparedEffects = [];
    for (const effect of effects) {
      preparedEffects.push(new tuna[effect.type](effect.config));
    }
    return preparedEffects;
  }
  // Advanced volume
  createEQ(bass0, mid0, trebble0, bass1, mid1, trebble1) {
    const adjustEQValue = value => {
      if (value > 0) {
        return value / 5;
      }
      return value;
    };
    const EQ = [
      [
        {
          f: 32,
          type: 'lowshelf',
          value: adjustEQValue(bass0)
        },
        {
          f: 64,
          type: 'peaking',
          value: adjustEQValue(bass0)
        },
        {
          f: 125,
          type: 'peaking',
          value: adjustEQValue(bass0)
        },
        {
          f: 250,
          type: 'peaking',
          value: adjustEQValue(bass0)
        },
        {
          f: 500,
          type: 'peaking',
          value: adjustEQValue(0.75 * bass0 + 0.25 * mid0)
        },
        {
          f: 1000,
          type: 'peaking',
          value: adjustEQValue(0.75 * mid0 + 0.25 * bass0)
        },
        {
          f: 2000,
          type: 'peaking',
          value: adjustEQValue(0.75 * mid0 + 0.25 * trebble0)
        },
        {
          f: 4000,
          type: 'peaking',
          value: adjustEQValue(0.75 * trebble0 + 0.25 * mid0)
        },
        {
          f: 8000,
          type: 'peaking',
          value: adjustEQValue(trebble0)
        },
        {
          f: 16000,
          type: 'highshelf',
          value: adjustEQValue(trebble0)
        }
      ],
      [
        {
          f: 32,
          type: 'lowshelf',
          value: adjustEQValue(bass1)
        },
        {
          f: 64,
          type: 'peaking',
          value: adjustEQValue(bass1)
        },
        {
          f: 125,
          type: 'peaking',
          value: adjustEQValue(bass1)
        },
        {
          f: 250,
          type: 'peaking',
          value: adjustEQValue(bass1)
        },
        {
          f: 500,
          type: 'peaking',
          value: adjustEQValue(0.75 * bass1 + 0.25 * mid1)
        },
        {
          f: 1000,
          type: 'peaking',
          value: adjustEQValue(0.75 * mid1 + 0.25 * bass1)
        },
        {
          f: 2000,
          type: 'peaking',
          value: adjustEQValue(0.75 * mid1 + 0.25 * trebble1)
        },
        {
          f: 4000,
          type: 'peaking',
          value: adjustEQValue(0.75 * trebble1 + 0.25 * mid1)
        },
        {
          f: 8000,
          type: 'peaking',
          value: adjustEQValue(trebble1)
        },
        {
          f: 16000,
          type: 'highshelf',
          value: adjustEQValue(trebble1)
        }
      ]
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
  constructor() {}
}
