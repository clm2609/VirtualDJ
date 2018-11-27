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
  slider: any;
  fillsize = 16;

  get thumbWidth(): any {
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    if (vertical) {
      return smallval;
    } else {
      return smallval / 2.5;
    }
  }
  get thumbHeight(): any {
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    if (!vertical) {
      return smallval;
    } else {
      return smallval / 2.5;
    }
  }
  get thumbTop(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;

    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    return vertical ? loc : 0;
  }
  get thumbLeft(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;

    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;

    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    return vertical ? 0 : loc;
  }

  get fillWidth(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;
    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    return vertical ? this.fillsize : loc + thumbsize / 2;
  }
  get fillHeight(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    const fillsize = 16;
    const filloffset = smallval / 2 - fillsize / 2;
    return Math.max(0, vertical ? bigval - filloffset - fillsize - loc : fillsize);
  }
  get fillTop(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;

    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;

    /* Fill */

    const fillsize = 16;
    const filloffset = smallval / 2 - fillsize / 2;
    return vertical ? loc + thumbsize : filloffset;
  }
  get fillLeft(): any {
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    const filloffset = smallval / 2 - this.fillsize / 2;
    return vertical ? filloffset : 0;
  }

  get trackWidth(): any {
    const val = this.slider;
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const pc = (val - this.config.min) / (this.config.max - this.config.min);
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;
    const tracksize = bigval - thumbsize;
    const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
    return vertical ? this.fillsize : loc + thumbsize / 2;
  }
  get trackHeight(): any {
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    return bigval - thumbsize * 1.25;
  }
  get trackTop(): any {
    const vertical = !!this.config.vertical;

    const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

    return thumbsize / 2;
  }
  get trackLeft(): any {
    const vertical = !!this.config.vertical;
    const shell = this.shell;
    const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
    const filloffset = smallval / 2 - this.fillsize / 2;
    return vertical ? filloffset : 0;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {}

  setValue() {
    this.onChangeCallback(this.slider);
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (!(typeof value === 'undefined' || value === null)) {
      this.slider = value;
    }
  }
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
