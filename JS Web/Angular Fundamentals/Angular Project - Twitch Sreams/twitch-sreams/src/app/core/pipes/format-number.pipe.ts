import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  constructor() { }
  transform(number : number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }
}
