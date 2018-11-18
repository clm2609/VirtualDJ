import { sandboxOf } from 'angular-playground';
import { RouletteControllerComponent } from './roulette-controller.component';
import { SliderControllerComponent } from '../slider-controller/slider-controller.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(RouletteControllerComponent, {
  imports: [FormsModule],
  declarations: [SliderControllerComponent]
}).add('default', {
  template: `<div style="height:200px"></div><roulette-controller [config]="config"></roulette-controller>`,
  context: {
    config: { id: 'roulette' }
  }
});
