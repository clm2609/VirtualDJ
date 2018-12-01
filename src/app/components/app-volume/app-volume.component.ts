import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-volume',
  templateUrl: './app-volume.component.html',
  styleUrls: ['./app-volume.component.css']
})
export class AppVolumeComponent implements OnInit {
  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }
  volume0 = 100;
  volume1 = 100;
  volumeMaster = 0;
  bass0 = 0;
  mid0 = 0;
  trebble0 = 0;
  bass1 = 0;
  mid1 = 0;
  trebble1 = 0;
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
  ngOnInit() {
    this.setEQ();
  }
  setEQ() {
    const EQ = [
      [
        {
          f: 32,
          type: 'lowshelf',
          value: this.adjustEQValue(this.bass0)
        },
        {
          f: 64,
          type: 'peaking',
          value: this.adjustEQValue(this.bass0)
        },
        {
          f: 125,
          type: 'peaking',
          value: this.adjustEQValue(this.bass0)
        },
        {
          f: 250,
          type: 'peaking',
          value: this.adjustEQValue(this.bass0)
        },
        {
          f: 500,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.bass0 + 0.25 * this.mid0)
        },
        {
          f: 1000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.mid0 + 0.25 * this.bass0)
        },
        {
          f: 2000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.mid0 + 0.25 * this.trebble0)
        },
        {
          f: 4000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.trebble0 + 0.25 * this.mid0)
        },
        {
          f: 8000,
          type: 'peaking',
          value: this.adjustEQValue(this.trebble0)
        },
        {
          f: 16000,
          type: 'highshelf',
          value: this.adjustEQValue(this.trebble0)
        }
      ],
      [
        {
          f: 32,
          type: 'lowshelf',
          value: this.adjustEQValue(this.bass1)
        },
        {
          f: 64,
          type: 'peaking',
          value: this.adjustEQValue(this.bass1)
        },
        {
          f: 125,
          type: 'peaking',
          value: this.adjustEQValue(this.bass1)
        },
        {
          f: 250,
          type: 'peaking',
          value: this.adjustEQValue(this.bass1)
        },
        {
          f: 500,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.bass1 + 0.25 * this.mid1)
        },
        {
          f: 1000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.mid1 + 0.25 * this.bass1)
        },
        {
          f: 2000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.mid1 + 0.25 * this.trebble1)
        },
        {
          f: 4000,
          type: 'peaking',
          value: this.adjustEQValue(0.75 * this.trebble1 + 0.25 * this.mid1)
        },
        {
          f: 8000,
          type: 'peaking',
          value: this.adjustEQValue(this.trebble1)
        },
        {
          f: 16000,
          type: 'highshelf',
          value: this.adjustEQValue(this.trebble1)
        }
      ]
    ];
    this.playerService.saveEQ(EQ);
  }
  adjustEQValue(value) {
    if (value > 0) {
      return value / 5;
    }
    return value;
  }
}
