import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstantsUltis } from 'src/app/shared/utils/ConstantsUltis';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { BusinessListComponent } from '../business-list/business-list.component';



const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent
  },
  {
    path: `${ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_DETAILS}/:id`,
    component: BusinessFormComponent
  },
  {
    path: `${ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_CREATE_UPDATE}/:id`,
    component: BusinessFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
