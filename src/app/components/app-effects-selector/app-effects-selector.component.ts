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
import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { PlayerService } from '../../services/player.service';
@Component({
  selector: 'app-effects-selector',
  templateUrl: './app-effects-selector.component.html',
  styleUrls: ['./app-effects-selector.component.css']
})
export class AppEffectsSelectorComponent implements OnInit {
  constructor(private effectServ: EffectsService, private playerServ: PlayerService) {
    this.effects = JSON.parse(JSON.stringify(this.playerServ.effects));
    this.availableEffects = this.effectServ.getEffects();
    this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
  }
  effectsNum = 6;
  effects = [null, null] as any;
  availableEffects: any;
  selectedEffects: any;
  ngOnInit() {
    this.playerServ.effects$[0].subscribe(effects => {
      this.effects[0] = JSON.parse(JSON.stringify(effects));
      this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
    });
    this.playerServ.effects$[1].subscribe(effects => {
      this.effects[1] = JSON.parse(JSON.stringify(effects));
      this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
    });
  }
  change(i, j) {
    this.playerServ.saveEffects(
      i,
      j,
      JSON.parse(JSON.stringify(this.availableEffects.find(a => Number(a.id) === Number(this.selectedEffects[i][j]))))
    );
  }
}
