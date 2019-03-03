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
