import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Tuna from 'tunajs';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  deckLoader = [new Subject(), new Subject()];
  deck$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  deck: any[] = [null, null];
  eq = [null, null];
  save(deck, wavesurfer) {
    this.deck[deck] = wavesurfer;
    this.deckLoader[deck].next(this.deck[deck]);
    this.deck[deck].on('ready', this.equalizer);
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
  applyBQFilter(deck) {
    const context = this.deck[deck].backend.getAudioContext();
    const biquadFilter = context.createBiquadFilter();
    console.log(biquadFilter);
    this.deck[deck].backend.setFilter(biquadFilter);
  }
  applyDistortion1(deck) {
    function makeDistortionCurve(amount) {
      const k = typeof amount === 'number' ? amount : 50;
      let i = 0;
      let x;
      const n_samples = 44100;
      const curve = new Float32Array(n_samples);
      const deg = Math.PI / 180;
      for (i; i < n_samples; ++i) {
        x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
      return curve;
    }

    const distortion = this.deck[deck].backend.ac.createWaveShaper();
    distortion.curve = makeDistortionCurve(400);
    distortion.oversample = '4x';

    this.deck[deck].backend.setFilter(distortion);
  }
  applyDistortion2(deck) {
    const tuna = new Tuna(this.deck[deck].backend.ac);
    console.log(tuna);
    const bitcrusher = new tuna.Bitcrusher({
      bits: 4, // 1 to 16
      normfreq: 0.1, // 0 to 1
      bufferSize: 4096 // 256 to 16384
    });
    console.log(bitcrusher);
    this.deck[deck].backend.setFilter(bitcrusher);
  }
  applyDistortion3(deck) {
    const tuna = new Tuna(this.deck[deck].backend.ac);
    console.log(tuna);
    const moog = new tuna.MoogFilter({
      cutoff: 0.065, // 0 to 1
      resonance: 3.5, // 0 to 4
      bufferSize: 4096 // 256 to 16384
    });
    console.log(moog);
    this.deck[deck].backend.setFilter(moog);
  }
  applyDistortion4(deck) {
    const tuna = new Tuna(this.deck[deck].backend.ac);
    console.log(tuna);
    const panner = new tuna.Panner({
      pan: 0 // -1 (left) to 1 (right)
    });
    console.log(panner);
    this.deck[deck].backend.setFilter(panner);
  }
  applyDistortion(deck) {
    const tuna = new Tuna(this.deck[deck].backend.ac);
    console.log(tuna);
    const pingPongDelay = new tuna.PingPongDelay({
      wetLevel: 0.5, // 0 to 1
      feedback: 0.3, // 0 to 1
      delayTimeLeft: 150, // 1 to 10000 (milliseconds)
      delayTimeRight: 200 // 1 to 10000 (milliseconds)
    });
    console.log(pingPongDelay);
    this.deck[deck].backend.setFilter(pingPongDelay);
  }
  clearFilter(deck) {
    this.deck[deck].backend.setFilter();
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
      this.deck[0].backend.setFilters(filter0);
      this.deck[1].backend.setFilters(filter1);
    }
  }

  saveEQ(eq) {
    this.eq = eq;
    this.equalizer();
  }
}
