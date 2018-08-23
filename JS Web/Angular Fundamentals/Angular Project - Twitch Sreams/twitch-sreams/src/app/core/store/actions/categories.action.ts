import { Action } from '@ngrx/store';
import { ICategory } from '../../interfaces/category.interface';

export const GET_ALL_CATEGORIES = '[CATEGORIES] Get All';
export const REMOVE_CATEGORY = '[CATEGORY] Remove';

export class GetCategories implements Action {
  readonly type = GET_ALL_CATEGORIES;

  constructor(public payload : ICategory[]) {}
}

export class RemoveCategory implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload : number) {}
}

export type Actions = GetCategories | RemoveCategory;
