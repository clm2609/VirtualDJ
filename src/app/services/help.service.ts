import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  help = new Subject();
  help$ = this.help.asObservable();

  save(helpquery) {
    this.help.next(helpquery);
  }
}
