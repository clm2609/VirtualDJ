import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.css']
})
export class AppTabsComponent {
  active = 'music';
  setActive(active) {
    this.active = active;
  }
}
