import { ChangeCoinPipe } from './../../shared/pipe/change-coin.pipe';
import { CepPipe } from './../../shared/pipe/cep.pipe';
import { CnpjPipe } from './../../shared/pipe/cnpj.pipe';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusinessService } from './../../shared/service/business.service';
import { CepApiService } from './../../shared/service/cep-api.service';
import { SharedModule } from './../../shared/shared.module';
import { BusinessFormComponent } from './business-form/business-form.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessRoutingModule } from './router/business-routing.module';


@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessFormComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule
  ],
  providers: [
    BusinessService,
    CepApiService,
    CnpjPipe,
    CurrencyPipe,
    CepPipe,
    ChangeCoinPipe
  ],
})
export class BusinessModule { }
