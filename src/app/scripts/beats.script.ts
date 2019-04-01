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
