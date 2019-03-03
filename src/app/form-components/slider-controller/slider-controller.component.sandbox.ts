import { sandboxOf } from 'angular-playground';
import { SliderControllerComponent } from './slider-controller.component';

import { FormsModule } from '@angular/forms';

export default sandboxOf(SliderControllerComponent, { imports: [FormsModule] }).add('default', {
  template: `<div style="height:400px;width:100px">
  <slider-controller [config]="config"></slider-controller>
  </div>`,
  context: {
    config: {
      id: 'slider',
      min: 0,
      max: 100,
      default: 100,
      vertical: true,
      fill: true,
      thumb: 'sliderthumb-pitch-vertical',
      track: 'slidertrack-pitch-vertical'
    },
    slider: 0
  }
});
