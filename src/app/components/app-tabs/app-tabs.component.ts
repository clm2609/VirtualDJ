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
import { Component, HostListener, Renderer2 } from '@angular/core';
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
  dragLeaveList;
  dropList;
  setActive(active) {
    this.active = active;
  }
  maximize() {
    this.maximized = !this.maximized;
  }
  constructor(private musicService: MusicLoaderService, private renderer: Renderer2) {}

  droped(event) {
    event.preventDefault();
    this.recievedFiles(event.dataTransfer.files);
    this.dragging = false;
  }
  @HostListener('window:dragover', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragging = true;
    this.dragLeaveList = this.renderer.listen('window', 'dragleave', () => {
      this.stopDrag();
    });
    this.dropList = this.renderer.listen('window', 'drop', () => {
      this.stopDrag();
    });
  }
  stopDrag() {
    this.dragging = false;
    this.dragLeaveList();
    this.dropList();
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
