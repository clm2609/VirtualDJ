import { sandboxOf } from 'angular-playground';
import { SliderControllerComponent } from './slider-controller.component';

import { FormsModule } from '@angular/forms';

export default sandboxOf(SliderControllerComponent, { imports: [FormsModule] }).add('default', {
  template: `<slider-controller [config]="config"></slider-controller>`,
  context: {
    config: { id: 'slider', min: 0, max: 100, vertical: true },
    slider: 0
  }
});
