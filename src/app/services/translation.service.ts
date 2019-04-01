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
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang: string;
  constructor(public translate: TranslateService) {
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      this.lang = 'en';
    }
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang(this.lang);
  }
  getTranslation() {
    return this.translate;
  }
  getActualLang() {
    return this.lang;
  }
  changeLanguage(newLang) {
    this.lang = newLang;
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
  }
}
