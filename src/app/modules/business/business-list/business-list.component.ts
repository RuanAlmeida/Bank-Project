import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { IBusiness } from 'src/app/shared/domain/ibusiness.model';
import { ConstantsUltis } from 'src/app/shared/utils/ConstantsUltis';
import { DialogComponent } from './../../../shared/component/dialog/dialog.component';
import { BusinessService } from './../../../shared/service/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'action'];
  business = new MatTableDataSource<IBusiness>();
  clickedRows = new Set<IBusiness>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  value: string = '';


  constructor(
    private businessService: BusinessService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.findAll();
  }

  initializationPagingMethods() {
    this.business.paginator = this.paginator;
    this.business.sort = this.sort;
  }

  findAll() {
    this.blockUI.start(this.translate.instant('mensagens.carregando'));
    this.businessService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(args => {
        this.business = new MatTableDataSource<IBusiness>(args)
        this.initializationPagingMethods();
      })

  }

  showDetail(id: number) {
    this.router.navigate([`${ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_DETAILS}/${id}`]);
  }

  goToEdition(id: number) {
    this.router.navigate([`${ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_CREATE_UPDATE}/${id}`]);
  }

  doFilter = (value: any) => {
    this.business.filter = value.target.value.trim().toLocaleLowerCase();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => (result) && this.delete(id));
  }

  delete(id: number) {
    this.blockUI.start(this.translate.instant('mensagens.carregando'));

    const index = this.getIndexBusiness(id);

    if (index !== -1) {
      this.business.data.splice(index, 1);
      this.initializationPagingMethods();
      this.toastr.success(this.translate.instant('mensagens.mensagem-sucesso'), this.translate.instant('mensagens.registro-deletado'));
      this.blockUI.stop();
      return;
    }
    this.toastr.success(this.translate.instant('mensagens.mensagem-erro'), this.translate.instant('mensagens.erro-deletar-registro'));
    this.blockUI.stop();
  }


  private getIndexBusiness(id: number): number {
    return this.business.data.findIndex(element => element.id === id);
  }
}
