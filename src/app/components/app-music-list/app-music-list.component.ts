import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-list',
  templateUrl: './app-music-list.component.html',
  styleUrls: ['./app-music-list.component.css']
})
export class AppMusicListComponent implements OnDestroy {
  musicService: MusicLoaderService;
  private musicSubscription: Subscription;
  musicList: any;
  constructor(musicService: MusicLoaderService) {
    this.musicService = musicService;
    this.musicSubscription = musicService.music$.subscribe(a => {
      this.musicList = a;
    });
  }

  ngOnDestroy(): void {
    this.musicSubscription.unsubscribe();
  }

  loadOnDeck(deck, i) {
    this.musicService.load(deck, i);
  }
  removeSong(i) {
    this.musicService.deleteSong(i);
  }
}
