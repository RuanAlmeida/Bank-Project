import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionActive'
})
export class DescriptionActivePipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Active' : 'Inactive';
  }

}
