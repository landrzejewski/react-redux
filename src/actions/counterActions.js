// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT';

// Action Creators
export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
});

export const reset = () => ({
    type: RESET
});

export const incrementByAmount = (amount) => ({
    type: INCREMENT_BY_AMOUNT,
    payload: amount
});
