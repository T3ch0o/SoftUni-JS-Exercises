import { ICategory } from '../interfaces/category.interface';
import { IUser } from '../interfaces/user.interface';

export interface AppState {
  readonly categories : ICategory[];
  readonly streams : Object[];
  readonly users : IUser[];
}
