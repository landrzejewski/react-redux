# Redux Basics

## What is Redux?

Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments, and are easy to test. Redux is commonly used with React, but it can be used with any UI library or framework.

Key benefits of Redux:
- **Predictable state management**: The state of your application is stored in a single store
- **Centralized state**: All state logic is in one place
- **Debuggable**: Easy to track when, where, why, and how the application's state changed
- **Flexible**: Works with any UI layer and has a large ecosystem of add-ons

## Core Redux Concepts

### 1. Store

The store is the central repository of state in a Redux application. It holds the complete state tree of your application. The only way to change the state inside it is to dispatch an action.

```javascript
// Creating a Redux store
import { createStore } from 'redux';
const store = createStore(reducer);
```

### 2. Actions

Actions are plain JavaScript objects that represent an intention to change the state. Actions must have a `type` property that indicates the type of action being performed. They can also include additional data (payload).

```javascript
// Action example
{ type: 'INCREMENT' }
// Action with payload
{ type: 'INCREASE', amount: 10 }
```

### 3. Reducers

Reducers specify how the application's state changes in response to actions. A reducer is a pure function that takes the previous state and an action, and returns the next state.

```javascript
// Reducer example
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return { counter: state.counter + 1 };
  }
  return state;
};
```

### 4. Dispatch

Dispatch is a method of the store that sends actions to the reducer to update the state.

```javascript
// Dispatching an action
store.dispatch({ type: 'INCREMENT' });
```

## Key Concepts by Example

### Setting Up a Redux Store

```javascript
// store/index.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

### Providing the Store to React Components

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Accessing Redux State in Components

```javascript
// components/Counter.js
import { useSelector } from 'react-redux';

const Counter = () => {
  // useSelector extracts data from the Redux store state
  const counter = useSelector(state => state.counter);
  
  return (
    <div>{counter}</div>
  );
};
```

### Dispatching Actions

```javascript
// components/Counter.js
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={incrementHandler}>Increment</button>
    </div>
  );
};
```

### Adding Payloads to Actions

```javascript
// Dispatching an action with payload
const increaseHandler = () => {
  dispatch({ type: 'increase', amount: 10 });
};

// Handling the payload in the reducer
if (action.type === 'increase') {
  return {
    counter: state.counter + action.amount
  };
}
```

### Working with Multiple State Properties

```javascript
// Initial state with multiple properties
const initialState = { counter: 0, showCounter: true };

// Reducer handling multiple properties
const counterReducer = (state = initialState, action) => {
  if (action.type === 'toggle') {
    return {
      ...state,
      showCounter: !state.showCounter
    };
  }
  // Other action handlers...
  return state;
};
```

## Redux vs. Redux Toolkit

Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It simplifies common Redux tasks and reduces boilerplate code.

### Traditional Redux

```javascript
// Traditional Redux setup
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  // More action handlers...
  return state;
};

const store = createStore(counterReducer);
```

### Redux Toolkit

```javascript
// Redux Toolkit setup
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterState = createSlice({
  name: 'counter',
  initialState: { counter: 0, showCounter: true },
  reducers: {
    increment(state) {
      // Redux Toolkit allows "mutating" logic in reducers
      // It uses Immer library internally to produce immutable state
      state.counter++;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

const store = configureStore({
  reducer: counterState.reducer
});

// Export action creators
export const counterActions = counterState.actions;
```

### Key Advantages of Redux Toolkit

1. **Simplified Configuration**: `configureStore` sets up a store with good defaults
2. **Reduced Boilerplate**: `createSlice` generates action creators and action types automatically
3. **Immutable Updates Made Easy**: Direct "mutation" of state is allowed in reducers (handled by Immer)
4. **Built-in DevTools**: Redux DevTools Extension is configured by default
5. **Thunk Middleware**: Included by default for async logic

## Working with Multiple Slices

As applications grow, it's common to split Redux state into multiple "slices" managed by different reducers:

```javascript
// Multiple slices with Redux Toolkit
const counterState = createSlice({
  name: 'counter',
  initialState: { counter: 0, showCounter: true },
  reducers: {
    // counter reducers...
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    }
  }
});

// Combine slices in the store
const store = configureStore({
  reducer: { 
    counter: counterState.reducer, 
    auth: authSlice.reducer 
  }
});

// Export actions
export const counterActions = counterState.actions;
export const authActions = authSlice.actions;
```

# Redux Counter Example Tutorial

This repository demonstrates how to implement a counter application using Redux in a React application. The tutorial covers two approaches:

1. Using plain Redux (without Redux Toolkit)
2. Using Redux Toolkit (RTK)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Project Setup

This project was created using Vite. If you're starting from scratch, you can create a new Vite project with:

```bash
npm create vite@latest my-redux-counter -- --template react
cd my-redux-counter
npm install
```

## Part 1: Implementing Counter with Plain Redux

### Step 1: Install Redux Dependencies

First, install the required dependencies:

```bash
npm install redux react-redux
```

### Step 2: Create Redux Store

Create a new file `src/redux/store.js`:

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

### Step 3: Create Redux Actions

Create a new file `src/redux/actions/counterActions.js`:

```javascript
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
```

### Step 4: Create Redux Reducer

Create a new file `src/redux/reducers/counterReducer.js`:

```javascript
import { INCREMENT, DECREMENT, RESET, INCREMENT_BY_AMOUNT } from '../actions/counterActions';

const initialState = {
  value: 0
};

const counterReducer = (state = initialState, action) => {
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
```

Create a new file `src/redux/reducers/index.js` to combine all reducers:

```javascript
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
```

### Step 5: Connect Redux to React

Update `src/main.jsx` to provide the Redux store to your React application:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Step 6: Update App Component

Update `src/App.jsx` to use Redux instead of local state:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './redux/actions/counterActions';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Redux</h1>
      <div className="card">
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Add 5
        </button>
        <p>Count is: {count}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```

## Part 2: Refactoring to Redux Toolkit

Redux Toolkit simplifies Redux development by providing utilities to reduce boilerplate code and enforce best practices.

### Step 1: Install Redux Toolkit

```bash
npm install @reduxjs/toolkit
```

### Step 2: Create Counter Slice

Replace the separate actions and reducers with a single "slice" file `src/redux/slices/counterState.js`:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const counterState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, reset, incrementByAmount } = counterState.actions;

export default counterState.reducer;
```

### Step 3: Update Redux Store

Replace `src/redux/store.js` with:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterState';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
```

### Step 4: Update App Component

Update `src/App.jsx` to use the new action creators:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './redux/slices/counterState';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Redux Toolkit</h1>
      <div className="card">
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Add 5
        </button>
        <p>Count is: {count}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```

## Comparing the Approaches

### Plain Redux

- More verbose with separate files for actions, action types, and reducers
- Requires manual setup for immutable state updates
- More boilerplate code
- Explicit action type constants

### Redux Toolkit

- Simplified with "slices" that combine actions and reducers
- Built-in immutability with Immer
- Less boilerplate code
- Automatic action creator generation
- Built-in Redux DevTools configuration
- Encourages best practices by default

## Running the Application

To run the application:

```bash
npm run dev
```

This will start the development server, and you can view the application at `http://localhost:5173`.

## Additional Resources

- [Redux Documentation](https://redux.js.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
