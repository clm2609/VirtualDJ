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
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { effectsCreatorArray } from 'src/app/data/effectsCreator';

@Component({
  selector: 'app-effects-creator',
  templateUrl: './app-effects-creator.component.html',
  styleUrls: ['./app-effects-creator.component.css']
})
export class AppEffectsCreatorComponent implements OnInit {
  effectsCreatorArray: any;
  effects: any;
  selectedEffect: string;
  selectedEffectRemove: string;
  effectStruct: any;
  JSON = JSON;
  config: FormGroup;
  name = '';
  validName = false;
  defaultStep = 0.01;
  selectedEffects;
  removableEffects;
  constructor(private effectServ: EffectsService, private builder: FormBuilder, private playerServ: PlayerService) {
    this.effectsCreatorArray = effectsCreatorArray;
    this.effects = this.effectServ.getEffects();
  }
  updateRemovableEffects() {
    this.removableEffects = this.effects.filter(effect => {
      return this.selectedEffects.indexOf(effect.id) === -1;
    });
  }
  ngOnInit() {
    this.selectedEffects = [
      ...this.playerServ.effects[0].map(effect => effect.id),
      ...this.playerServ.effects[1].map(effect => effect.id)
    ];
    this.updateRemovableEffects();
  }
  updateEffect(effect) {
    this.effectStruct = JSON.parse(effect);
    const config = {};
    for (const actualConfig of this.effectStruct.configs) {
      if (this.isDefined(actualConfig.min)) {
        config[actualConfig.name] = [
          actualConfig.default,
          [
            Validators.required,
            Validators.min(actualConfig.min),
            Validators.max(actualConfig.max),
            stepValidator(actualConfig.step ? actualConfig.step : this.defaultStep)
          ]
        ];
      }
      if (this.isDefined(actualConfig.values)) {
        config[actualConfig.name] = actualConfig.default;
      }
      if (this.isDefined(actualConfig.value)) {
        config[actualConfig.name] = actualConfig.value;
      }
    }
    this.config = this.builder.group(config);
  }
  reset() {
    this.selectedEffect = null;
    this.effectStruct = null;
  }
  resetRemove() {
    this.updateRemovableEffects();
    this.selectedEffectRemove = null;
  }
  isDefined(something) {
    return typeof something !== 'undefined';
  }
  createEffect() {
    if (this.validName && this.config.valid) {
      this.effectServ.addEffect({
        name: this.name,
        type: this.effectStruct.name,
        active: false,
        config: this.config.value
      });
      this.effects = this.effectServ.getEffects();
      this.reset();
      this.updateRemovableEffects();
    }
  }
  checkName() {
    if (
      !this.effects.find(
        effect =>
          effect.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') ===
          this.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
      )
    ) {
      this.validName = true;
    } else {
      this.validName = false;
    }
  }
  removeEffect() {
    this.effectServ.removeEffect(this.selectedEffectRemove);
    this.effects = this.effectServ.getEffects();
    this.resetRemove();
  }
}
function stepValidator(step: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // decimalAdjust is needed because of js clunky floating point maths
    const forbidden = decimalAdjust('round', control.value / step, -5) % 1 !== 0;
    return forbidden ? { 'forbidden number step': { value: control.value } } : null;
  };
}
function decimalAdjust(type, value, exp) {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}
