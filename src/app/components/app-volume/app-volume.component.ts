import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-volume',
  templateUrl: './app-volume.component.html',
  styleUrls: ['./app-volume.component.css']
})
export class AppVolumeComponent {
  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }
  volume0 = 100;
  volume1 = 100;
  volumeMaster = 0;
  playerService: PlayerService;

  changeVolume(deck) {
    let masterMultiplier = 1;
    if (deck === 0 && this.volumeMaster > 0) {
      masterMultiplier = (100 - this.volumeMaster) / 100;
    }
    if (deck === 1 && this.volumeMaster < 0) {
      masterMultiplier = (100 + this.volumeMaster) / 100;
    }
    this.playerService.setVolume(deck, (this['volume' + deck] / 100) * masterMultiplier);
  }
}
