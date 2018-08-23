import * as CategoryActions from '../actions/categories.action'
import { ICategory } from '../../interfaces/category.interface';

const initialState : ICategory[] = [];

export function categoriesReducer(state : ICategory[] = initialState, action : CategoryActions.Actions) {
  switch (action.type) {
    case CategoryActions.GET_ALL_CATEGORIES:
      state = action.payload.slice();
      return state;
    case CategoryActions.REMOVE_CATEGORY:
      state.splice(action.payload, 1);
      return state;
    default:
      return state;
  }
}
