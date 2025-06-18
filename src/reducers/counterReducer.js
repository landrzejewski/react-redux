import {DECREMENT, INCREMENT, INCREMENT_BY_AMOUNT, RESET} from "../actions/counterActions.js";

const initialState = {
    value: 0
};

const counterReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            };
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            };
        case RESET:
            return {
                ...state,
                value: 0
            };
        case INCREMENT_BY_AMOUNT:
            return {
                ...state,
                value: state.value + action.payload
            };
        default:
            return state;
    }
};

export default counterReducer;