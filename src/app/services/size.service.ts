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
