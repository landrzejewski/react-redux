import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, reset} from "./actions/counterActions.js";

function App() {

  const counterValue = useSelector(state => state.counter.value)
  const dispatch = useDispatch();
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
    </>
  )
}

export default App
