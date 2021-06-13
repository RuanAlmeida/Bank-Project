import { ActivatedRoute } from '@angular/router';
import { ViaCepObject } from './../../domain/via-cep-object.model';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepApiService } from './../../service/cep-api.service';
import { Andress } from './../../domain/andress.model';
import { ConstantsUltis } from '../../utils/ConstantsUltis';

@Component({
  selector: 'app-cep-input',
  templateUrl: './cep-input.component.html',
  styleUrls: ['./cep-input.component.scss']
})
export class CepInputComponent implements OnChanges {

  form!: FormGroup;

  @Input() cpe!: number;
  @Output() loadAndress = new EventEmitter<Andress>();
  isCreateOrUpdateEntity!: boolean;

  constructor(
    private cepApiService: CepApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.getParamDescrition();
    this.form = this.buildReactiveForm();
  }

  private getParamDescrition() {
    this.isCreateOrUpdateEntity = ConstantsUltis.getParamDescrition(this.route, ConstantsUltis.BUSISNESS_ROUTER_DESCRISTION_CREATE_UPDATE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      if (chng) {
        const cur  = chng.currentValue;
        this.onLoadEntity(cur);
        this.getCep(cur);
      }
    }
  }


  buildReactiveForm() {
    return this.formBuilder.group({
      cep:  new FormControl({value: null, disabled: !this.isCreateOrUpdateEntity}, [Validators.required])
    });
  }

  onLoadEntity(cep: string){
    this.form.get('cep')?.setValue(cep);
  }

  getCep(cep: string){
    if (cep)
      this.cepApiService.getCep(cep).subscribe(arg => this.buildAndressObject(arg))
  }


  buildAndressObject(viaCepObject: ViaCepObject){
    let andress = {} as Andress;
    andress.city = viaCepObject.localidade;
    andress.state = viaCepObject.uf;
    andress.street = viaCepObject.logradouro;
    andress.district = viaCepObject.bairro;
    andress.cep = viaCepObject.cep;
    this.loadAndress.emit(andress);
  }


}
