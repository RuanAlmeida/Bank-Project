import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeCoin'
})
export class ChangeCoinPipe implements PipeTransform {

  constructor(
    private currencyPipe: CurrencyPipe
  ){}

  transform(value: string): unknown {
    return (localStorage.getItem('lang')?.includes('pt')) ?  this.currencyPipe.transform(value, 'BRL') : this.currencyPipe.transform(value);
  }

}
