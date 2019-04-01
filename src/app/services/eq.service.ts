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
