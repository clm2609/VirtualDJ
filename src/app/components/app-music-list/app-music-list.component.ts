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
import { Component, OnInit, OnDestroy, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
import { Subscription, iif } from 'rxjs';
import { AngularDraggableDirective } from 'angular2-draggable';

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
  dragging: boolean;
  startX;
  startY;
  @ViewChildren(AngularDraggableDirective)
  songs: any;
  @ViewChild('container')
  scrollable: ElementRef;
  offSet;
  index = -1;
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
    if (this.musicSubscription) {
      this.musicSubscription.unsubscribe();
    }
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
        if (files.item(i).type.includes('audio')) {
          this.musicService.addSong(files.item(i));
        }
      }
    }
  }
  removeAllSongs() {
    this.musicService.deleteAllSongs();
  }
  dragStart(i) {
    this.index = i;
    this.offSet = { x: 0, y: -(this.scrollable.nativeElement as HTMLElement).scrollTop };
    this.dragging = true;
  }
  dragEnd(pos, i) {
    this.offSet = { x: 0, y: 0 };
    this.dragging = false;
    // TODO: search a more elegant solution than by cursor position
    if (window.outerHeight * 0.5 > this.startY + pos.y) {
      if (window.outerWidth * 0.4 > this.startX + pos.x) {
        this.loadOnDeck(0, this.shownMusic[i]);
      } else if (window.outerWidth * 0.6 < this.startX + pos.x) {
        this.loadOnDeck(1, this.shownMusic[i]);
      }
    }
    this.songs._results[i].resetPosition();
  }
  saveStartPos(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;
  }
}
