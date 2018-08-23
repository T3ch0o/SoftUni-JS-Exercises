import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { FilterUsersPipe } from './filter-users.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { SearchPipe } from './search.pipe';
import { LimitToPipe } from './limit-to.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SafePipe,
    FilterUsersPipe,
    FormatNumberPipe,
    SearchPipe,
    LimitToPipe
  ],
  exports: [
    SafePipe,
    FilterUsersPipe,
    FormatNumberPipe,
    SearchPipe,
    LimitToPipe
  ]
})
export class PipesModule { }
