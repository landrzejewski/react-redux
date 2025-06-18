import React from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset, incrementByAmount, counterSelector } from "./counter/counter";
import UserList from "./users/UserList";
import { AppDispatch } from './store';

const App: React.FC = () => {
  const counterValue = useSelector(counterSelector);
  const dispatch = useDispatch<AppDispatch>();
  const byValue = 5;

  return (
    <>
      <div className="card">
        <p>Counter: {counterValue}</p>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(incrementByAmount(byValue))}>By value (5)</button>
      </div>
      <div className="card">
        <UserList />
      </div>
    </>
  );
};

export default App;
