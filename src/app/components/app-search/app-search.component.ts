import { Component, OnInit } from '@angular/core';
import { MusicLoaderService } from '../../services/music-loader.service';
@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.css']
})
export class AppSearchComponent implements OnInit {
  musicService: MusicLoaderService;
  constructor(musicService: MusicLoaderService) {
    this.musicService = musicService;
  }

  ngOnInit() {}
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
}
