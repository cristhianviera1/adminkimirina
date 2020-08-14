import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertable'
})
export class FiltertablePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg === null || arg.length < 3) { return value; }
    const filterResult = [];
    for (const item of value) {
      if (JSON.stringify(item).toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        filterResult.push(item);
      }
    }
    return filterResult;
  }

}
