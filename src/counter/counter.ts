import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState, RootState } from "../types";

const initialState: CounterState = {
  value: 0
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
});

export const {
  increment,
  decrement,
  reset,
  incrementByAmount
} = counter.actions;

export const counterSelector = (state: RootState) => state.counter.value;

export default counter.reducer;
