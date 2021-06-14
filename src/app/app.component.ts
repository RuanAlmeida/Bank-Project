import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang('pt');
    translateService.use(localStorage.getItem('lang') || 'pt');
  }

}
