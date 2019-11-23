import React, { useState } from "react";
import "./App.css";

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <button onClick={onClick}>{text}</button>
);

const Statistic = ({ text, value }: { text: string; value: number }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};
const Statistics = ({
  good,
  bad,
  neutral
}: {
  good: number;
  bad: number;
  neutral: number;
}) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good * 1 + bad * -1) / all : 0;
  const positive = all > 0 ? good / all : 0;
  if (all === 0) {
    return <h3>No feedback given</h3>;
  }
  return (
    <>
      <h3>statistics</h3>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </>
  );
};
const App: React.FC = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  // const handleClick = (status: "good" | "bad" | "neutral") => {
  //   // const setCountByStatus: { [key in typeof status]: () => void } = {
  //   //   good: setGood(1),
  //   //   bad: setBad,
  //   //   neutral: setNeutral
  //   // };
  //   // setCountByStatus[status](1);
  // };
  return (
    <div className="App">
      <section>
        <h1>give feedback</h1>
        <Button onClick={handleClickGood} text="good" />
        <Button onClick={handleClickNeutral} text="neutral" />
        <Button onClick={handleClickBad} text="bad" />
      </section>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
