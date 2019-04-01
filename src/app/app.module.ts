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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDeckComponent } from './components/app-deck/app-deck.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AppVolumeComponent } from './components/app-volume/app-volume.component';
import { SliderControllerComponent } from './form-components/slider-controller/slider-controller.component';
import { FormsModule } from '@angular/forms';
import { RouletteControllerComponent } from './form-components/roulette-controller/roulette-controller.component';
import { AppTabsComponent } from './components/app-tabs/app-tabs.component';
import { AppMusicListComponent } from './components/app-music-list/app-music-list.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { AppEffectsSelectorComponent } from './components/app-effects-selector/app-effects-selector.component';
import { AppAboutComponent } from './components/app-about/app-about.component';
import { AppEffectsCreatorComponent } from './components/app-effects-creator/app-effects-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHelpComponent } from './components/app-help/app-help.component';
import { AngularDraggableDirective } from './directives/ngdraggable/ngdraggable.directive';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { registerLocaleData } from '@angular/common';

// importar locales

import localeEs from '@angular/common/locales/es';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    AppDeckComponent,
    AppLayoutComponent,
    AppVolumeComponent,
    SliderControllerComponent,
    RouletteControllerComponent,
    AppTabsComponent,
    AppMusicListComponent,
    AppSettingsComponent,
    AppAboutComponent,
    AppEffectsCreatorComponent,
    AppHelpComponent,
    AppEffectsSelectorComponent,
    AngularDraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
