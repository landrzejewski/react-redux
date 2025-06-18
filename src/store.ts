import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counter';
import usersReducer from './users/users';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer
  }
});

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
