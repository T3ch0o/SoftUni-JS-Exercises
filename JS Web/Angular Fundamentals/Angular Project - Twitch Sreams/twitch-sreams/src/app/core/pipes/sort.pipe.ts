import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  constructor() { }
  transform(items : Array<Object>) {
    console.log(items);
    return items;
  }
}
