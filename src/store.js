import {configureStore} from "@reduxjs/toolkit";
import counter from './counter/counter'
import users from './users/users'

const store = configureStore({
 reducer: {
     counter,
     users
 }
});

export default store;