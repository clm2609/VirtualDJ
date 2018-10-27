import { Component, OnInit } from '@angular/core';
import { RouterState } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './app-deck.component.html',
  styleUrls: ['./app-deck.component.css']
})
export class AppDeckComponent implements OnInit {
  rotation = 0;
  private active = true;
  constructor() {}

  ngOnInit() {
    // setInterval(() => {
    //   this.rotate();
    // }, 50);
  }
  rotate() {
    if (active) {
      this.rotation = (this.rotation + 15) % 360;
    }
  }
}
