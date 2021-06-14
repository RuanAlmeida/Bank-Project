import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionActive'
})
export class DescriptionActivePipe implements PipeTransform {

  constructor(private translate: TranslateService){}

  transform(value: boolean): string {
    return value ? 'listagem.formulario.ativo' : 'form-negociacao.inactive';
  }

}
