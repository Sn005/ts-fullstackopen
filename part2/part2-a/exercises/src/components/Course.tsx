import React, { FC } from "react";

export interface Part {
  name: string;
  exercises: number;
  id: number;
}
export interface CourseProps {
  name: string;
  parts: Part[];
}

const Part: FC<{ part: Part }> = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Course: FC<{ course: CourseProps }> = ({ course }) => {
  const { name, parts } = course;
  const rows = () => parts.map(part => <Part key={part.id} part={part} />);
  const countExercises = parts.reduce((a, c) => a + c.exercises, 0);
  return (
    <>
      <h1>{name}</h1>
      <ul>{rows()}</ul>
      <p>{countExercises}</p>
    </>
  );
};

export default Course;
