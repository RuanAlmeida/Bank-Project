import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selected = 'pt';

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }


  getATranslater() {
    this.translateService.use('en');
  }

}
