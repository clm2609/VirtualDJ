import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDeckComponent } from './app-deck/app-deck.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppVolumeComponent } from './app-volume/app-volume.component';
import { SliderControllerComponent } from './slider-controller/slider-controller.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AppDeckComponent, AppLayoutComponent, AppVolumeComponent, SliderControllerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
