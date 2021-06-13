import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CepInputComponent } from './component/cep-input/cep-input.component';
import { HeaderComponent } from './component/header/header.component';
import { CepPipe } from './pipe/cep.pipe';
import { CnpjPipe } from './pipe/cnpj.pipe';
import { DescriptionActivePipe } from './pipe/description-active.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    DescriptionActivePipe,
    CepInputComponent,
    CnpjPipe,
    CepPipe
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    HeaderComponent,
    MatSelectModule,
    DescriptionActivePipe,
    CepInputComponent,
    FormsModule,
    ReactiveFormsModule,
    CnpjPipe
  ]
})
export class SharedModule { }
