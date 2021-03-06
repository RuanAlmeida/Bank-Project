import { ChangeCoinPipe } from './../../../shared/pipe/change-coin.pipe';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { CepPipe } from './../../../shared/pipe/cep.pipe';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBusiness } from 'src/app/shared/domain/ibusiness.model';
import { ConstantsUltis } from 'src/app/shared/utils/ConstantsUltis';
import { Andress } from './../../../shared/domain/andress.model';
import { CnpjPipe } from './../../../shared/pipe/cnpj.pipe';
import { BusinessService } from './../../../shared/service/business.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {


  @BlockUI() blockUI!: NgBlockUI;

  form!: FormGroup;

  option: any;

  disableSelect = new FormControl(false);

  actives: boolean[] = [true, false];

  isCreateOrUpdateEntity: boolean = false;

  name!: string;

  iBusiness!: IBusiness;



  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
    private cnpjPipe: CnpjPipe,
    private changeCoinPipe: ChangeCoinPipe,
    private cepPipe: CepPipe,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.findOne(id);
    this.getParamDescrition();
    this.form = this.buildReactiveForm();

  }


  private getParamDescrition() {
    this.isCreateOrUpdateEntity = ConstantsUltis.getParamDescrition(this.route, ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_CREATE_UPDATE);
  }



  buildReactiveForm() {
    return this.formBuilder.group({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      business: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      valuation: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      active: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      cnpj: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      city: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      state: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      street: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),
      district: new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required]),

    });
  }

  onLoadEntity(entity: IBusiness){
    this.form.patchValue({
      id: entity.id,
      name: entity.name,
      business: entity.business,
      valuation: this.changeCoinPipe.transform(entity.valuation),
      active: entity.active,
      cep: this.cepPipe.transform(entity.cep),
      cnpj: this.cnpjPipe.transform(entity.cnpj),
      })
      this.setNameBusiness(entity.name);
  }

  onLoadAndress(andress: Andress){
    this.form.patchValue({
      street: andress.street,
      district: andress.district,
      state: andress.state,
      city: andress.city
      })
  }

  private setNameBusiness(description: string) {
    this.name = description;
   }

  onSubmit(){
     this.blockUI.start(this.translate.instant('mensagens.carregando'));
    this.iBusiness = this.form.value;
    this.businessService.update(this.iBusiness)
    .pipe(finalize(() => this.blockUI.stop()))
    .subscribe(()=>  {
      this.toastr.success(
      this.translate.instant('mensagens.mensagem-sucesso'), this.translate.instant('mensagens.registro-atualizado'));
      this.back();})
  }

  cleanValuesIBusiness(){
    this.iBusiness.cep = ConstantsUltis.cleanValue(this.iBusiness.cep);
    this.iBusiness.cnpj = ConstantsUltis.cleanValue(this.iBusiness.cnpj);
    this.iBusiness.valuation = ConstantsUltis.cleanValue(this.iBusiness.valuation);
  }

  findOne(id: number){
     this.blockUI.start(this.translate.instant('mensagens.carregando'));
    this.businessService.findOne(id)
    .pipe(finalize(() => this.blockUI.stop()))
    .subscribe(args =>  this.onLoadEntity(args));
  }

  loadAndress(event: Andress){
      this.onLoadAndress(event);
  }


  back(){
    this.router.navigate(['../'])
  }

}
