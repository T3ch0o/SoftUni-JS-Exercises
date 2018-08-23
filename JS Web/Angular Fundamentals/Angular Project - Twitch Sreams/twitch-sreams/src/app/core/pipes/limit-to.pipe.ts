import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  constructor() { }
  transform(items : Array<Object>, limit : number) {
    const streams = Object.assign([], items);
    return streams;
  }
}
