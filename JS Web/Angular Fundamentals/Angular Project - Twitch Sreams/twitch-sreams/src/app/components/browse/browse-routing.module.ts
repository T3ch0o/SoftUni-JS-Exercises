import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { GameCategoryComponent } from './game-category/game-category.component';
import { StreamComponent } from './stream/stream.component';

const routes : Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'category/:id',
    component: GameCategoryComponent
  },
  {
    path: 'stream/:name',
    component: StreamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule { }
