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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  width = new Subject();
  height = new Subject();
  actualWidth: number;
  actualHeight: number;
  width$ = this.width.asObservable();
  height$ = this.height.asObservable();
  constructor() {
    if (localStorage.getItem('width') && localStorage.getItem('height')) {
      this.actualWidth = Number(localStorage.getItem('width'));
      this.actualHeight = Number(localStorage.getItem('height'));
    } else {
      this.actualWidth = null;
      this.actualHeight = null;
    }
  }
  changeSize(width, height) {
    this.width.next(width);
    this.height.next(height);
    this.actualWidth = width;
    this.actualHeight = height;
    if (width && height) {
      localStorage.setItem('width', width);
      localStorage.setItem('height', height);
    } else {
      localStorage.removeItem('width');
      localStorage.removeItem('height');
    }
  }
  getWidth() {
    return this.actualWidth;
  }

  getHeight() {
    return this.actualHeight;
  }
}
