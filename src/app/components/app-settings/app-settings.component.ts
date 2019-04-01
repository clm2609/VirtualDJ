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
import { Component, OnInit } from '@angular/core';
import { SizeService } from '../../services/size.service';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  constructor(private sizeService: SizeService, private translationService: TranslationService) {
    this.lang = translationService.getActualLang();
  }
  size = 'auto';
  lang: string;
  ngOnInit() {
    if (this.sizeService.getWidth() && this.sizeService.getHeight()) {
      this.size = this.sizeService.getWidth() + 'x' + this.sizeService.getHeight();
    }
  }
  changeSize() {
    if (this.size === 'auto') {
      this.sizeService.changeSize(null, null);
    } else {
      const size = this.size.split('x');
      this.sizeService.changeSize(size[0], size[1]);
    }
  }
  changeLang() {
    this.translationService.changeLanguage(this.lang);
  }
}
