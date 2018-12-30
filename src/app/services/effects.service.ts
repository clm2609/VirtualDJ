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
  effectsCreator = [
    {
      name: 'Chorus',
      effect: 'Chorus',
      description: 'A basic chorus effect.',
      configs: [
        { name: 'rate', min: 0.01, max: 8 },
        { name: 'feedback', min: 0, max: 1 },
        { name: 'delay', min: 0, max: 1 },
        { name: 'bypass', values: [0, 1] }
      ]
    },
    {
      description: 'A delay effect with feedback and a lowpass filter applied to the delayed signal.',
      name: 'Delay',
      effect: 'Delay',

      configs: [
        { name: 'feedback', min: 0, max: 1 },
        { name: 'delayTime', min: 1, max: 10000 },
        { name: 'wetLevel', min: 0, max: 1 },
        { name: 'dryLevel', min: 0, max: 1 },
        { name: 'cutoff', min: 20, max: 22050 },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A basic phaser effect.',
      name: 'Phaser',
      effect: 'Phaser',
      configs: [
        { name: 'rate', min: 0.01, max: 8 },
        { name: 'depth', min: 0, max: 1 },
        { name: 'feedback', min: 0, max: 1 },
        { name: 'stereoPhase', min: 0, max: 180 },
        { name: 'baseModulationFrequency', min: 500, max: 1500 },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A basic overdrive effect.',
      name: 'Overdrive',
      effect: 'Overdrive',
      configs: [
        { name: 'outputGain', min: 0, max: 1 },
        { name: 'drive', min: 0, max: 1 },
        { name: 'curveAmount', min: 0, max: 1 },
        { name: 'algorithmIndex', values: [0, 1, 2, 3, 4, 5] },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A compressor with the option to use automatic makeup gain.',
      name: 'Compressor',
      effect: 'Compressor',
      configs: [
        { name: 'threshold', min: -100, max: 0 },
        { name: 'makeupGain', min: 0, max: 10 },
        { name: 'attack', min: 0, max: 1000 },
        { name: 'release', min: 0, max: 3000 },
        { name: 'ratio', min: 1, max: 20 },
        { name: 'knee', min: 0, max: 40 },
        { name: 'automakeup', values: [true, false] },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A basic filter.',
      name: 'Filter',
      effect: 'Filter',
      configs: [
        { name: 'frequency', min: 20, max: 22050 },
        { name: 'Q', min: 0.001, max: 100 },
        { name: 'gain', min: -40, max: 40 },
        {
          name: 'filterType',
          values: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']
        },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A basic tremolo.',
      name: 'Tremolo',
      effect: 'Tremolo',
      configs: [
        { name: 'intensity', min: 0, max: 1 },
        { name: 'rate', min: 0.001, max: 8 },
        { name: 'stereoPhase', min: 0, max: 180 },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A wahwah with an auto wah option.',
      name: 'WahWah',
      effect: 'WahWah',
      configs: [
        { name: 'automode', values: [true, false] },
        { name: 'baseFrequency', min: 0, max: 1 },
        { name: 'excursionOctaves', min: 1, max: 6 },
        { name: 'sweep', min: 0, max: 1 },
        { name: 'resonance', min: 1, max: 100 },
        { name: 'sensitivity', min: -1, max: 1 },
        { name: 'bypass', value: 0 }
      ]
    },
    {
      description: 'A lo- fi bitcrusher effect.',
      name: 'Bitcrusher',
      effect: 'Bitcrusher',
      configs: [
        { name: 'bits', min: 1, max: 16 },
        { name: 'normfreq', min: 0, max: 1 },
        { name: 'bufferSize', values: [256, 512, 1024, 2048, 4096, 8192, 16384] }
      ]
    },
    {
      description: 'A resonant, analog- sounding filter.',
      name: 'MoogFilter',
      effect: 'MoogFilter',
      configs: [
        { name: 'cutoff', min: 0, max: 1 },
        { name: 'resonance', min: 0, max: 4 },
        { name: 'bufferSize', values: [256, 512, 1024, 2048, 4096, 8192, 16384] }
      ]
    },
    {
      description: 'A delay that bounces between the left and right channel.',
      name: 'Ping Pong Delay',
      effect: 'PingPongDelay',
      configs: [
        { name: 'wetLevel', min: 0, max: 1 },
        { name: 'feedback', min: 0, max: 1 },
        { name: 'delayTimeLeft', min: 1, max: 10000 },
        { name: 'delayTimeRight', min: 1, max: 10000 }
      ]
    },
    {
      description: 'A basic gain.',
      name: 'Gain',
      effect: 'Gain',
      configs: [{ name: 'gain', min: 0, max: 40 }]
    }
  ];
  getEffects() {
    return JSON.parse(JSON.stringify(this.effects));
  }
  addEffect(effect) {
    effect.id = this.effects.reduce((valorAnterior, valorActual) => Math.max(valorAnterior, valorActual.id), 0) + 1;
    this.effects.push(effect);
    localStorage.setItem('effects', JSON.stringify(this.effects));
  }

  removeEffect(id) {
    this.effects = this.effects.filter(effects => effects.id !== id);
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
  constructor() {
    if (localStorage.getItem('effects')) {
      this.effects = JSON.parse(localStorage.getItem('effects'));
    } else {
      localStorage.setItem('effects', JSON.stringify(this.effects));
    }
  }
}
