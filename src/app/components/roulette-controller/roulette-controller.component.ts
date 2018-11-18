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
  folded = true;
  value = 100;
  configSlider: any;
  rotation: number;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {}

  ngOnInit() {
    this.configSlider = {
      id: this.config.id + 'slider',
      min: 0,
      max: 100,
      default: 100,
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
  }
  unfold() {
    this.folded = !this.folded;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
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
