import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { PlayerService } from '../../services/player.service';
import { SizeService } from '../../services/size.service';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-effects-selector',
  templateUrl: './app-effects-selector.component.html',
  styleUrls: ['./app-effects-selector.component.css']
})
export class AppEffectsSelectorComponent implements OnInit {
  constructor(
    private effectServ: EffectsService,
    private playerServ: PlayerService,
    private sizeService: SizeService,
    private translationService: TranslationService
  ) {
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
