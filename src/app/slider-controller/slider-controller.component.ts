import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NativeElement } from '../decorators/native-element.decorator';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/** @ignore */ const noop = () => {};
/** @ignore */

export const CUSTOM_TEXT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderControllerComponent),
  multi: true
};

@Component({
  selector: 'slider-controller',
  templateUrl: './slider-controller.component.html',
  styleUrls: ['./slider-controller.component.css'],
  providers: [CUSTOM_TEXT_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SliderControllerComponent implements OnInit, ControlValueAccessor {
  @Input()
  config: any;
  @NativeElement('sliderShell')
  shell: HTMLElement;
  @NativeElement('sliderThumb')
  thumb: HTMLElement;
  slider: any;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    this.setValue(this.config.default);
  }
  showValue() {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const thumb = this.thumb;

    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    if (vertical) {
      thumb.style.width = smallval + 'px';
      thumb.style.height = smallval / 2.5 + 'px';
    } else {
      thumb.style.height = smallval + 'px';
      thumb.style.width = smallval / 2.5 + 'px';
    }
    const thumbsize = vertical ? thumb.offsetHeight : thumb.offsetWidth;

    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    thumb.style.top = (vertical ? loc : 0) + 'px';
    thumb.style.left = (vertical ? 0 : loc) + 'px';
  }
  setValue(val) {
    this.slider = val;
    this.onChangeCallback(val);
    this.onTouchedCallback();
    this.showValue();
  }

  writeValue(value: any) {
    if (value !== this.slider) {
      this.setValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
