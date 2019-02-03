import { Component, HostListener } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.css']
})
export class AppTabsComponent {
  active = 'music';
  dragging = false;
  maximized = false;
  musicService: MusicLoaderService;
  setActive(active) {
    this.active = active;
  }
  maximize() {
    this.maximized = !this.maximized;
  }
  constructor(musicService: MusicLoaderService) {
    this.musicService = musicService;
  }

  droped(event) {
    event.preventDefault();
    event.stopPropagation();
    this.recievedFiles(event.dataTransfer.files);
    this.dragging = false;
  }
  @HostListener('window:dragover', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragging = true;
  }
  @HostListener('window:dragleave')
  stopdrag() {
    this.dragging = false;
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
}
