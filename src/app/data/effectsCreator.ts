export const effectsCreatorArray = [
  {
    name: 'Chorus',
    effect: 'Chorus',
    description: 'A basic chorus effect.',
    configs: [
      { name: 'rate', min: 0.01, max: 8, default: 1.5 },
      { name: 'feedback', min: 0, max: 1, default: 0.2 },
      { name: 'delay', min: 0, max: 1, default: 0.0045, step: 0.0001 },
      { name: 'bypass', values: [0, 1], default: 0 }
    ]
  },
  {
    description: 'A delay effect with feedback and a lowpass filter applied to the delayed signal.',
    name: 'Delay',
    effect: 'Delay',

    configs: [
      { name: 'feedback', min: 0, max: 1, default: 0.45 },
      { name: 'delayTime', min: 1, max: 10000, default: 150, step: 1 },
      { name: 'wetLevel', min: 0, max: 1, default: 0.25 },
      { name: 'dryLevel', min: 0, max: 1, default: 1 },
      { name: 'cutoff', min: 20, max: 22050, default: 2000 },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A basic phaser effect.',
    name: 'Phaser',
    effect: 'Phaser',
    configs: [
      { name: 'rate', min: 0.01, max: 8, default: 1.2 },
      { name: 'depth', min: 0, max: 1, default: 0.3 },
      { name: 'feedback', min: 0, max: 1, default: 0.2 },
      { name: 'stereoPhase', min: 0, max: 180, default: 30, step: 1 },
      { name: 'baseModulationFrequency', min: 500, max: 1500, default: 700, step: 1 },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A basic overdrive effect.',
    name: 'Overdrive',
    effect: 'Overdrive',
    configs: [
      { name: 'outputGain', min: 0, max: 1, default: 0.5 },
      { name: 'drive', min: 0, max: 1, default: 0.7 },
      { name: 'curveAmount', min: 0, max: 1, default: 1 },
      { name: 'algorithmIndex', values: [0, 1, 2, 3, 4, 5], default: 0 },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A compressor with the option to use automatic makeup gain.',
    name: 'Compressor',
    effect: 'Compressor',
    configs: [
      { name: 'threshold', min: -100, max: 0, default: -1 },
      { name: 'makeupGain', min: 0, max: 50, default: 1 },
      { name: 'attack', min: 0, max: 1000, default: 1 },
      { name: 'release', min: 0, max: 3000, default: 0 },
      { name: 'ratio', min: 1, max: 20, default: 4 },
      { name: 'knee', min: 0, max: 40, default: 5 },
      { name: 'automakeup', values: [true, false], default: true },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A basic filter.',
    name: 'Filter',
    effect: 'Filter',
    configs: [
      { name: 'frequency', min: 20, max: 22050, default: 440, step: 1 },
      { name: 'Q', min: 0.001, max: 100, default: 1, step: 0.001 },
      { name: 'gain', min: -40, max: 40, default: 0 },
      {
        name: 'filterType',
        values: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'],
        default: 'lowpass'
      },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A basic tremolo.',
    name: 'Tremolo',
    effect: 'Tremolo',
    configs: [
      { name: 'intensity', min: 0, max: 1, default: 0.3 },
      { name: 'rate', min: 0.001, max: 8, default: 4 },
      { name: 'stereoPhase', min: 0, max: 180, default: 0 },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A wahwah with an auto wah option.',
    name: 'WahWah',
    effect: 'WahWah',
    configs: [
      { name: 'automode', values: [true, false], default: true },
      { name: 'baseFrequency', min: 0, max: 1, default: 0.5 },
      { name: 'excursionOctaves', min: 1, max: 6, default: 2, step: 1 },
      { name: 'sweep', min: 0, max: 1, default: 0.2 },
      { name: 'resonance', min: 1, max: 100, default: 10 },
      { name: 'sensitivity', min: -1, max: 1, default: 0.5 },
      { name: 'bypass', value: 0 }
    ]
  },
  {
    description: 'A lo- fi bitcrusher effect.',
    name: 'Bitcrusher',
    effect: 'Bitcrusher',
    configs: [
      { name: 'bits', min: 1, max: 16, default: 4 },
      { name: 'normfreq', min: 0, max: 1, default: 0.1 },
      { name: 'bufferSize', values: [256, 512, 1024, 2048, 4096, 8192, 16384], default: 4096 }
    ]
  },
  {
    description: 'A resonant, analog- sounding filter.',
    name: 'MoogFilter',
    effect: 'MoogFilter',
    configs: [
      { name: 'cutoff', min: 0, max: 1, default: 0.065, step: 0.001 },
      { name: 'resonance', min: 0, max: 4, default: 3.5 },
      { name: 'bufferSize', values: [256, 512, 1024, 2048, 4096, 8192, 16384], default: 4096 }
    ]
  },
  {
    description: 'A delay that bounces between the left and right channel.',
    name: 'Ping Pong Delay',
    effect: 'PingPongDelay',
    configs: [
      { name: 'wetLevel', min: 0, max: 1, default: 0.5 },
      { name: 'feedback', min: 0, max: 1, default: 0.3 },
      { name: 'delayTimeLeft', min: 1, max: 10000, default: 150, step: 1 },
      { name: 'delayTimeRight', min: 1, max: 10000, default: 200, step: 1 }
    ]
  },
  {
    description: 'A basic gain.',
    name: 'Gain',
    effect: 'Gain',
    configs: [{ name: 'gain', min: 0, max: 40 }]
  },
  {
    description: 'A stereo panner (-1 is left, 1 is right). May not work in Safari and IE.',
    name: 'Panner',
    effect: 'Panner',
    configs: [{ name: 'pan', min: -1, max: 1, default: 0 }]
  }
];
