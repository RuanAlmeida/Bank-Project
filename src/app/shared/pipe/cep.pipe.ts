import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string): unknown {
    return (value) && value.toString().replace(/^(\d{0,5})(\d{0,3})/, '$1-$2');
  }

}
