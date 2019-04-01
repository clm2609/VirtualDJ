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
import { sandboxOf } from 'angular-playground';
import { RouletteControllerComponent } from './roulette-controller.component';
import { SliderControllerComponent } from '../slider-controller/slider-controller.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(RouletteControllerComponent, {
  imports: [FormsModule],
  declarations: [SliderControllerComponent]
})
  .add('default', {
    template: `{{ input.value }}
  <div style="height:200px;"></div>
  <div style=" margin-left:300px;"><roulette-controller [config]="config" #input></roulette-controller></div>`,
    context: {
      config: { id: 'roulette' }
    }
  })
  .add('max 50', {
    template: `{{ input.value }}
  <div style="height:200px;"></div>
  <div style=" margin-left:300px;"><roulette-controller [config]="config" #input></roulette-controller></div>`,
    context: {
      config: { id: 'roulette', max: 50, min: -50 }
    }
  });
