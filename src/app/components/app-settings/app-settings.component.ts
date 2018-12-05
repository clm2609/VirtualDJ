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
    this.effects[0] = JSON.parse(JSON.stringify(this.playerServ.effects[0]));
    this.effects[1] = JSON.parse(JSON.stringify(this.playerServ.effects[1]));
    this.availableEffects = this.effectServ.getEffects();
    this.selectedEffects = this.effects.map(c =>
      c.map(a => {
        return JSON.stringify(
          this.availableEffects.find(b => {
            a.active = false;
            return JSON.stringify(a) === JSON.stringify(b);
          })
        );
      })
    );
  }
  JSON = JSON;
  effectsNum = 6;
  effects = [null, null] as any;
  availableEffects: any;
  selectedEffects: any;
  ngOnInit() {
    this.playerServ.effects$[0].subscribe(effects => {
      this.effects[0] = JSON.parse(JSON.stringify(effects));
      this.availableEffects = this.effectServ.getEffects();
      this.selectedEffects = this.effects.map(c =>
        c.map(a => {
          return JSON.stringify(
            this.availableEffects.find(b => {
              a.active = false;
              return JSON.stringify(a) === JSON.stringify(b);
            })
          );
        })
      );
    });
    this.playerServ.effects$[1].subscribe(effects => {
      this.effects[1] = JSON.parse(JSON.stringify(effects));
      this.availableEffects = this.effectServ.getEffects();
      this.selectedEffects = this.effects.map(c =>
        c.map(a => {
          return JSON.stringify(
            this.availableEffects.find(b => {
              a.active = false;
              return JSON.stringify(a) === JSON.stringify(b);
            })
          );
        })
      );
    });
  }
  change(i, j) {
    this.playerServ.saveEffects(i, j, this.selectedEffects.map(a => a.map(b => this.JSON.parse(b)))[i][j]);
  }
}
