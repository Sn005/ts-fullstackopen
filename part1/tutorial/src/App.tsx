import React, { useState } from "react";
import Hello from "./Hello";
import AppD from "./AppD";
import "./App.css";

const Display = ({ counter }: { counter: number }) => <div>{counter}</div>;
const Button = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <button onClick={onClick}>{text}</button>
);

const App: React.FC = () => {
  const name = "Peter";
  const age = 10;
  const [counter, setCounter] = useState(0);
  // setTimeout(() => setCounter(counter + 1), 1000);
  // const setToValue = (value: number) => setCounter(value);
  const setToValue = (value: number) => () => setCounter(value);

  return (
    <div className="App">
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Display counter={counter} />
      <Button onClick={setToValue(counter + 1)} text="plus" />
      <Button onClick={setToValue(0)} text="zero" />
      <AppD />
    </div>
  );
};

export default App;
