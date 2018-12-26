import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { PlayerService } from '../../services/player.service';
@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  constructor(private effectServ: EffectsService, private playerServ: PlayerService) {
    this.effects = JSON.parse(JSON.stringify(this.playerServ.effects));
    this.availableEffects = this.effectServ.getEffects();
    this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
  }
  JSON = JSON;
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
