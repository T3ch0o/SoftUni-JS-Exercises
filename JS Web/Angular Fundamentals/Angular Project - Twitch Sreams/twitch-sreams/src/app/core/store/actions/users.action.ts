import { Action } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';

export const GET_ALL_USERS = '[USERS] Get All';

export class AddUser implements Action {
  readonly type = GET_ALL_USERS;

  constructor(public payload : IUser[]) {}
}

export type Actions = AddUser ;
