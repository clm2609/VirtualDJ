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
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { MusicLoaderService } from '../../services/music-loader.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-volume',
  templateUrl: './app-volume.component.html',
  styleUrls: ['./app-volume.component.css']
})
export class AppVolumeComponent implements OnInit, AfterViewInit {
  constructor(
    private musicService: MusicLoaderService,
    private playerService: PlayerService,
    helpService: HelpService
  ) {
    helpService.help$.subscribe(help => {
      this.help = help;
    });
  }
  help: any;
  volume0 = 100;
  volume1 = 100;
  volumeMaster = 0;
  bass0 = 0;
  mid0 = 0;
  trebble0 = 0;
  bass1 = 0;
  mid1 = 0;
  trebble1 = 0;
  musicSubscription = [null, null];
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
  ngOnInit() {
    this.setEQ(0);
    this.setEQ(1);
  }
  setEQ(i) {
    this.playerService.saveEQ(this['bass' + i], this['mid' + i], this['trebble' + i], i);
  }
  resetEQ(deck) {
    if (deck === 0) {
      this.bass0 = 0;
      this.mid0 = 0;
      this.trebble0 = 0;
    }
    if (deck === 1) {
      this.bass1 = 0;
      this.mid1 = 0;
      this.trebble1 = 0;
    }
    this.setEQ(deck);
  }
  ngAfterViewInit() {
    this.musicSubscription[0] = this.musicService.decksongs$[0].subscribe(a => {
      this.resetEQ(0);
    });
    this.musicSubscription[1] = this.musicService.decksongs$[1].subscribe(a => {
      this.resetEQ(1);
    });
  }
  maxVol(deck) {
    this['volume' + deck] = 100;
    this.changeVolume(deck);
  }
  mute(deck) {
    this['volume' + deck] = 0;
    this.changeVolume(deck);
  }
}
