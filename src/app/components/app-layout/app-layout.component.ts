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
import { Component, HostListener } from '@angular/core';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  width: number;
  height: number;
  actualWidth: number;
  actualHeight: number;
  window = window;
  constructor(sizeService: SizeService) {
    this.actualWidth = window.innerWidth;
    this.actualHeight = window.innerHeight;
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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.actualWidth = window.innerWidth;
    this.actualHeight = window.innerHeight;
  }
}
