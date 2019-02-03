import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('sliderShell')
  shellView: ElementRef;
  shell: HTMLElement;
  slider: any;
  fillsize = 16;
  zindex = 0;

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
    if (this.shell) {
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
      if (!vertical) {
        return smallval;
      } else {
        return smallval / 2.5;
      }
    } else {
      return null;
    }
  }
  get thumbTop(): any {
    if (this.shell) {
      const val = this.slider;
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const pc = (val - this.config.min) / (this.config.max - this.config.min);
      const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;

      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

      const tracksize = bigval - thumbsize;
      const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
      return vertical ? loc : 0;
    } else {
      return null;
    }
  }
  get thumbLeft(): any {
    if (this.shell) {
      const val = this.slider;
      const vertical = !!this.config.vertical;
      const shell = this.shell;

      const pc = (val - this.config.min) / (this.config.max - this.config.min);
      const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;

      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

      const tracksize = bigval - thumbsize;
      const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
      return vertical ? 0 : loc;
    } else {
      return null;
    }
  }

  get fillWidth(): any {
    if (this.shell) {
      const val = this.slider;
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const pc = (val - this.config.min) / (this.config.max - this.config.min);
      const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;
      const tracksize = bigval - thumbsize;
      const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
      return vertical ? this.fillsize : loc + thumbsize / 2;
    } else {
      return null;
    }
  }
  get fillHeight(): any {
    if (this.shell) {
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
    } else {
      return null;
    }
  }
  get fillTop(): any {
    if (this.shell) {
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
    } else {
      return null;
    }
  }
  get fillLeft(): any {
    if (this.shell) {
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
      const filloffset = smallval / 2 - this.fillsize / 2;
      return vertical ? filloffset : 0;
    } else {
      return null;
    }
  }

  get trackWidth(): any {
    if (this.shell) {
      const val = this.slider;
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const pc = (val - this.config.min) / (this.config.max - this.config.min);
      const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;
      const tracksize = bigval - thumbsize;
      const loc = vertical ? (1 - pc) * tracksize : pc * tracksize;
      return vertical ? this.fillsize : loc + thumbsize / 2;
    } else {
      return null;
    }
  }
  get trackHeight(): any {
    if (this.shell) {
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const bigval = vertical ? shell.offsetHeight : shell.offsetWidth;
      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

      return bigval - thumbsize * 1.25;
    } else {
      return null;
    }
  }
  get trackTop(): any {
    if (this.shell) {
      const vertical = !!this.config.vertical;

      const thumbsize = vertical ? this.thumbHeight : this.thumbWidth;

      return thumbsize / 2;
    } else {
      return null;
    }
  }
  get trackLeft(): any {
    if (this.shell) {
      const vertical = !!this.config.vertical;
      const shell = this.shell;
      const smallval = vertical ? shell.offsetWidth : shell.offsetHeight;
      const filloffset = smallval / 2 - this.fillsize / 2;
      return vertical ? filloffset : 0;
    } else {
      return null;
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    this.shell = this.shellView.nativeElement;
    this.zindex = this.config.zindex || 0;
  }

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
