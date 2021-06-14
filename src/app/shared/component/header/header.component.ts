import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  buttonLanguangeAtive?: boolean;

  constructor(
    private translateService: TranslateService
  ) {
    this.buttonLanguangeAtive = localStorage.getItem('lang')?.includes('pt');
  }

  ngOnInit(): void {
    localStorage.setItem('lang', localStorage.getItem('lang') || 'pt');
  }


  getATranslater() {
    this.translateService.use('en');
  }

  changeLanguade() {
    const lang = (!this.buttonLanguangeAtive) ? 'pt' : 'en';
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.buttonLanguangeAtive = !this.buttonLanguangeAtive;
    window.location.reload();
  }

}
