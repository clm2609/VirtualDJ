import { Component, HostListener } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  translationService: any;
  constructor(translationService: TranslationService) {
    this.translationService = translationService;
    translationService.getActualLang();
  }
  @HostListener('window:drop', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
