import React, { useState } from "react";

const History = ({ allClicks }: { allClicks: string[] }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <button onClick={onClick}>{text}</button>
);

const App: React.FC = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState<string[]>([]);

  const handleLeftClick = () => {
    debugger;
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };
  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left" />
        <Button onClick={handleRightClick} text="right" />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

export default App;
