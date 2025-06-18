import rootReducer from "./reducers/rootReducer.js";
import {createStore} from "redux";

const store = createStore(
    rootReducer
);

export default store;