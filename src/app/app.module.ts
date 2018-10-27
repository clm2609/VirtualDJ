import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDeckComponent } from './app-deck/app-deck.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  declarations: [AppComponent, AppDeckComponent, AppLayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
