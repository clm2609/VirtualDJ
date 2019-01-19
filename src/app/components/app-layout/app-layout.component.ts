import { Component, OnInit } from '@angular/core';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  width: number;
  height: number;
  window = window;
  constructor(sizeService: SizeService) {
    this.width = sizeService.getWidth();
    this.height = sizeService.getHeight();
    sizeService.width$.subscribe(value => {
      if (value) {
        this.width = Number(value);
      } else {
        this.width = null;
      }
    });
    sizeService.height$.subscribe(value => {
      if (value) {
        this.height = Number(value) - 1;
      } else {
        this.height = null;
      }
    });
  }
}
