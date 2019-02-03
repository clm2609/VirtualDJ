import { Component, OnInit } from '@angular/core';
import { EffectsService } from '../../services/effects.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

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
  nameChars = 5;
  validName = false;
  defaultStep = 0.01;
  constructor(private effectServ: EffectsService, private builder: FormBuilder) {
    this.effectsCreatorArray = this.effectServ.getEffectsCreator();
    this.effects = this.effectServ.getEffects();
  }
  ngOnInit() {}
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
      ) &&
      this.name.length >= this.nameChars
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
