import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './app-help.component.html',
  styleUrls: ['./app-help.component.css']
})
export class AppHelpComponent implements OnInit {
  constructor(private helpService: HelpService) {}

  ngOnInit() {}
  help(helpquery) {
    this.helpService.save(helpquery);
    setTimeout(() => {
      this.helpService.save(null);
    }, 1000);
  }
}
