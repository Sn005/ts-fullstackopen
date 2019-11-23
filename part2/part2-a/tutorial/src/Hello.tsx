import React, { FC } from "react";
interface HelloProps {
  name: string;
  age: number;
}

const Hello: FC<HelloProps> = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

export default Hello;
