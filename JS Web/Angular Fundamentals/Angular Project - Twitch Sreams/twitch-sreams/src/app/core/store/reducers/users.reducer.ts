import * as UserActions from '../actions/users.action'
import { IUser } from '../../interfaces/user.interface';

const initialState : IUser[] = [];

export function usersReducer(state : IUser[] = initialState, action : UserActions.Actions) {
  switch (action.type) {
    case UserActions.GET_ALL_USERS:
      state = action.payload.slice();
      return state;
    default:
      return state;
  }
}
