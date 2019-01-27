declare function importScripts(...urls: string[]): void;
declare function postMessage(message: any): void;

// Declare the library object so the script can be compiled without any problem
declare const MusicTempo: any;

export const CALC_BEATS = input => {
  importScripts(`${input.protocol}//${input.host}/scripts/browser/music-tempo.js`);
  const mt = new MusicTempo(input.ad);
  const beatCalc = {};
  beatCalc['bpm'] = mt.tempo;
  beatCalc['beats'] = mt.beats;
  postMessage(beatCalc);
};
