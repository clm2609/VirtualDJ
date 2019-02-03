import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { PlayerService } from '../../services/player.service';
import { SizeService } from '../../services/size.service';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  constructor(
    private effectServ: EffectsService,
    private playerServ: PlayerService,
    private sizeService: SizeService,
    private translationService: TranslationService
  ) {
    this.effects = JSON.parse(JSON.stringify(this.playerServ.effects));
    this.availableEffects = this.effectServ.getEffects();
    this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
    this.lang = translationService.getActualLang();
  }
  JSON = JSON;
  effectsNum = 6;
  effects = [null, null] as any;
  availableEffects: any;
  selectedEffects: any;
  size = 'auto';
  lang: string;
  ngOnInit() {
    this.playerServ.effects$[0].subscribe(effects => {
      this.effects[0] = JSON.parse(JSON.stringify(effects));
      this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
    });
    this.playerServ.effects$[1].subscribe(effects => {
      this.effects[1] = JSON.parse(JSON.stringify(effects));
      this.selectedEffects = this.effects.map(c => c.map(a => this.availableEffects.find(b => a.id === b.id).id));
    });
    if (this.sizeService.getWidth() && this.sizeService.getHeight()) {
      this.size = this.sizeService.getWidth() + 'x' + this.sizeService.getHeight();
    }
  }
  change(i, j) {
    this.playerServ.saveEffects(
      i,
      j,
      JSON.parse(JSON.stringify(this.availableEffects.find(a => Number(a.id) === Number(this.selectedEffects[i][j]))))
    );
  }
  changeSize() {
    if (this.size === 'auto') {
      this.sizeService.changeSize(null, null);
    } else {
      const size = this.size.split('x');
      this.sizeService.changeSize(size[0], size[1]);
    }
  }
  changeLang() {
    this.translationService.changeLanguage(this.lang);
  }
}
