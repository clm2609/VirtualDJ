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
import { Component, OnInit, Input, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/** @ignore */ const noop = () => {};
/** @ignore */

export const CUSTOM_TEXT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RouletteControllerComponent),
  multi: true
};
@Component({
  selector: 'roulette-controller',
  templateUrl: './roulette-controller.component.html',
  styleUrls: ['./roulette-controller.component.css'],
  providers: [CUSTOM_TEXT_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RouletteControllerComponent implements OnInit, ControlValueAccessor {
  @Input()
  config: any;
  left: number;
  folded = true;
  value = 0;
  configSlider: any;
  rotation: number;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {}

  ngOnInit() {
    this.left = this.config.right ? 20 : -60;
    this.configSlider = {
      id: this.config.id + 'slider',
      min: this.config.min || 0,
      max: this.config.max || 100,
      default: this.value,
      thumb: 'roulette-slider-thumb',
      track: 'roulette-slider-track',
      vertical: true,
      fill: true
    };
    this.rotate();
  }

  rotate() {
    const percent = (this.value - this.configSlider.min) / (this.configSlider.max - this.configSlider.min);
    this.rotation = 135 * 2 * (percent - 0.5);
    this.onChangeCallback(this.value);
  }
  unfold() {
    this.folded = !this.folded;
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (!(typeof value === 'undefined' || value === null)) {
      this.value = value;
      this.rotate();
    }
  }
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  @HostListener('document:click', ['$event'])
  private onDocumentClick(event: MouseEvent) {
    const closest = (el, selector) => {
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

      while (el) {
        if (matchesSelector.call(el, selector)) {
          break;
        }
        el = el.parentElement;
      }
      return el;
    };
    const ele = event.target as Element;
    if (!closest(ele, '#' + this.config.id + '_container')) {
      this.folded = true;
    }
  }
}
