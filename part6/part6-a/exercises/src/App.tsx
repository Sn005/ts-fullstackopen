import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions, counterSelectors } from "./state/domain/counter";

const App: FC = () => {
  const count = useSelector(counterSelectors.getCount);
  const dispatch = useDispatch();
  const handleIncrement = () => dispatch(counterActions.increment());
  const handleDecrement = () => dispatch(counterActions.decrement());
  const handleAdd = (amount: number) => () =>
    dispatch(counterActions.add(amount));
  const handleReset = () => dispatch(counterActions.reset());
  return (
    <>
      <div>{count}</div>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
      <button onClick={handleAdd(1)}>add</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
};

export default App;
