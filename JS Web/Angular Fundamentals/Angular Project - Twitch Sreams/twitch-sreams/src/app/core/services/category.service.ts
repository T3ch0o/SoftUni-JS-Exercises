import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { CategoryCreateModel } from '../models/categoryCreate.model';
import { map } from 'rxjs/operators';
import { ICategory } from '../interfaces/category.interface';
import * as CategoryActions from '../store/actions/categories.action';

const appKey = 'kid_r1H54C8SX';
const categoriesUrl = `https://baas.kinvey.com/appdata/${appKey}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http : HttpClient,
              private store : Store<AppState>) { }

  createCategory(body : CategoryCreateModel) {
    body.imageUrl = decodeURI(body.imageUrl);
    body['votes'] = {
      likes: [],
      dislikes: []
    };

    this.http.post(categoriesUrl, body)
      .subscribe(() => {
        this.getAllCategories()
          .subscribe();
      });
  }

  updateCategory(body : ICategory, id : string) {
    body.imageUrl = decodeURI(body.imageUrl);

    this.http.put(categoriesUrl + `/${id}`, body)
      .subscribe(() => {
        this.getAllCategories()
          .subscribe();
      });
  }

  getAllCategories() {
    return this.http.get(categoriesUrl)
      .pipe(map((response : Response) => {
        const categories : ICategory[] = [];

        // @ts-ignore
        response.sort((c1,c2) => c1._kmd.ect > c2._kmd.ect);

        // @ts-ignore
        for (const category of response) {
          categories.push({id: category._id,
            name: category.name,
            imageUrl: encodeURI(category.imageUrl),
            banner: category.banner,
            streams: category.streams,
            votes: category.votes
          });
        }

        this.store.dispatch(new CategoryActions.GetCategories(categories));
    }));
  }

  removeCategory(id : string, index : number) {
    this.http.delete(categoriesUrl + `/${id}`)
      .subscribe();
    this.store.dispatch(new CategoryActions.RemoveCategory(index));
  }
}
