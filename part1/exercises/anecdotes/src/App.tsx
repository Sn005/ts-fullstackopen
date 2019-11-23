import React, { FC, useState } from "react";
import "./App.css";

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <button onClick={onClick}>{text}</button>
);

interface AppProps {
  anecdotes: string[];
}
const App: FC<AppProps> = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);
  const onClickNext = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const onClickVote = (selected: number) => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    setMostVotes(newPoints.indexOf(Math.max(...newPoints)));
  };
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button onClick={() => onClickVote(selected)} text="vote" />
      <Button onClick={onClickNext} text="next anecdote" />
      <h1>Anecdote with most vote</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {points[mostVotes]} votes</p>
    </div>
  );
};

export default App;
