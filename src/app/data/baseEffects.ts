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

export const baseEffects = [
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
