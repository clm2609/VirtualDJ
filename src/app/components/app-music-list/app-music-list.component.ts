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
  musicList: File[];
  shownMusic: File[];
  query: string;
  constructor(musicService: MusicLoaderService) {
    this.musicService = musicService;
    this.musicList = musicService.music;
    this.updateMusic();
    this.musicSubscription = musicService.music$.subscribe(a => {
      this.musicList = a as File[];
      this.updateMusic();
    });
  }

  ngOnDestroy(): void {
    this.musicSubscription.unsubscribe();
  }

  loadOnDeck(deck, song) {
    this.musicService.load(deck, song);
  }
  removeSong(song) {
    this.musicService.deleteSong(song);
  }
  updateMusic() {
    if (!this.query) {
      this.shownMusic = this.musicList;
    } else {
      const searchMusic = (searchQuery, music: any[]) => {
        const lowSearch = searchQuery
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return music.filter(mus => {
          return String(mus.name)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(lowSearch);
        });
      };
      this.shownMusic = searchMusic(this.query, this.musicList);
    }
  }
  fileChangeEvent(fileInput: any) {
    this.recievedFiles(fileInput.target.files);
  }

  recievedFiles(files: FileList) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.musicService.addSong(files.item(i));
      }
    }
  }
  removeAllSongs() {
    this.musicService.deleteAllSongs();
  }
}
