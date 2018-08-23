import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICategory } from '../../../core/interfaces/category.interface';
import { AppState } from '../../../core/store/app.state';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class CategoriesComponent implements OnInit {
  public categories$ : Observable<ICategory[]>;

  constructor(private categoryService : CategoryService,
              private authService : AuthenticationService,
              private store : Store<AppState>) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(() => {
        this.categories$ = this.store.select('categories');
      });
  }

  deleteCategory(id : string, index : number) {
    this.categoryService.removeCategory(id, index);
  }
}
