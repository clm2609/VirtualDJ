import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from './player.service';
import MusicTempo from 'music-tempo';
import { WebWorkerService } from 'ngx-web-worker';
@Injectable({
  providedIn: 'root'
})
export class MusicLoaderService {
  musicLoader = new Subject();
  music$ = this.musicLoader.asObservable();
  music: File[] = [];
  deckLoader = [new Subject(), new Subject()];
  decksongs$ = [this.deckLoader[0].asObservable(), this.deckLoader[1].asObservable()];
  decksongs: any[] = [{}, {}];
  constructor(private playerService: PlayerService, private _webWorkerService: WebWorkerService) {}
  load(deck, song) {
    requestAnimationFrame(() => {
      const reader = new FileReader();
      reader.readAsDataURL(song);
      reader.onload = () => {
        this.playerService.load(deck, reader.result);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
      const reader1 = new FileReader();
      reader1.readAsArrayBuffer(song);
      reader1.onload = () => {
        const context = new AudioContext();
        context.decodeAudioData(reader1.result as ArrayBuffer, buffer => {
          let audioData = [];
          // Take the average of the two channels
          if (buffer.numberOfChannels === 2) {
            const channel1Data = buffer.getChannelData(0);
            const channel2Data = buffer.getChannelData(1);
            const length = channel1Data.length;
            for (let i = 0; i < length; i++) {
              audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
            }
          } else {
            audioData = buffer.getChannelData(0) as any;
          }
          this._webWorkerService
            .run(ad => {
              const mt = new MusicTempo(ad);
              const beatCalc = {};
              beatCalc['bpm'] = mt.tempo;
              beatCalc['beats'] = mt.beats;
              return beatCalc;
            }, audioData)
            .then(beatCalc => {
              beatCalc['song'] = song;
              this.decksongs[deck] = beatCalc;
              this.deckLoader[deck].next(this.decksongs[deck]);
            });

          this.deckLoader[deck].next(this.decksongs[deck]);
        });
      };
      reader1.onerror = error => {
        console.log('Error: ', error);
      };
    });
  }
  addSong(song: File) {
    this.music.push(song);
    this.musicLoader.next(this.music);
  }
  deleteSong(song) {
    this.music.splice(this.music.indexOf(song), 1);
    this.musicLoader.next(this.music);
  }
}
