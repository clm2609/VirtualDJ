import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { EffectsService } from '../../services/effects.service';
import { MusicLoaderService } from '../../services/music-loader.service';

@Component({
  selector: 'app-volume',
  templateUrl: './app-volume.component.html',
  styleUrls: ['./app-volume.component.css']
})
export class AppVolumeComponent implements OnInit, AfterViewInit {
  constructor(
    private musicService: MusicLoaderService,
    private effectServ: EffectsService,
    private playerService: PlayerService
  ) {}
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
    this.setEQ();
  }
  setEQ() {
    const EQ = this.effectServ.createEQ(this.bass0, this.mid0, this.trebble0, this.bass1, this.mid1, this.trebble1);
    this.playerService.saveEQ(EQ);
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
    this.setEQ();
  }
  ngAfterViewInit() {
    this.musicSubscription[0] = this.musicService.decksongs$[0].subscribe(a => {
      this.resetEQ(0);
    });
  }
}
