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
