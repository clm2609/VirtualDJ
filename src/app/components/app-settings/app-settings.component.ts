import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { PlayerService } from '../../services/player.service';
@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  constructor(private effectServ: EffectsService, private playerServ: PlayerService) {}
  effectsNum = 6;
  ngOnInit() {
    // for (let i = 0; i < this.effectsNum; i++) {
    //   this.playerServ.saveEffects(0, i, this.effectServ.getEffects()[i])
    // }
  }
}
