import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoutingModule } from './browse-routing.module';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../core/pipes/pipes.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'

import { browseComponents } from './index';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    BrowseRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PipesModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [ ...browseComponents ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class BrowseModule { }
