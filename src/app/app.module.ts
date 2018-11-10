import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDeckComponent } from './app-deck/app-deck.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppVolumeComponent } from './app-volume/app-volume.component';
import { SliderControllerComponent } from './slider-controller/slider-controller.component';
import { FormsModule } from '@angular/forms';
import { RouletteControllerComponent } from './roulette-controller/roulette-controller.component';
import { AppSearchComponent } from './app-search/app-search.component';
import { AppTabsComponent } from './app-tabs/app-tabs.component';
import { AppMusicListComponent } from './app-music-list/app-music-list.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppAboutComponent } from './app-about/app-about.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDeckComponent,
    AppLayoutComponent,
    AppVolumeComponent,
    SliderControllerComponent,
    RouletteControllerComponent,
    AppSearchComponent,
    AppTabsComponent,
    AppMusicListComponent,
    AppSettingsComponent,
    AppAboutComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
