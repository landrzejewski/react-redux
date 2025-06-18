import {configureStore} from "@reduxjs/toolkit";
import counter from './counter.js'

const store = configureStore({
 reducer: {
     counter
 }
});

export default store;