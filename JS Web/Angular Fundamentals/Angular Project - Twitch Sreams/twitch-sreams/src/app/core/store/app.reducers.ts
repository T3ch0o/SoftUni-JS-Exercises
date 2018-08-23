import { categoriesReducer } from "./reducers/categories.reducer";
import { streamsReducer } from "./reducers/streams.reducer";
import { usersReducer } from './reducers/users.reducer';

export const appReducers = {
  categories: categoriesReducer,
  streams: streamsReducer,
  users: usersReducer
};
