import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from './../../../shared/component/dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBusiness } from 'src/app/shared/domain/ibusiness.model';
import { ConstantsUltis } from 'src/app/shared/utils/ConstantsUltis';
import { BusinessService } from './../../../shared/service/business.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';

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
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.findAll();
  }

  initializationPagingMethods() {
    this.business.paginator = this.paginator;
    this.business.sort = this.sort;
  }

  findAll() {
    this.blockUI.start('Loading...');
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
    this.blockUI.start('Loading...');

    const index = this.getIndexBusiness(id);

    if (index !== -1) {
      this.business.data.splice(index, 1);
      this.initializationPagingMethods();
      this.toastr.success('Mensagem de Sucesso', 'Registro Deletado!');
      this.blockUI.stop();
      return;
    }
    this.toastr.error('Mensagem de Erro', 'Erro ao deletar o registro!');
    this.blockUI.stop();
  }


  private getIndexBusiness(id: number): number {
    return this.business.data.findIndex(element => element.id === id);
  }
}
