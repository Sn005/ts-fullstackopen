import React, { FC, MouseEvent } from "react";
import { Person as PersonInterface } from "../services/persons/models";

interface PersonProps {
  person: PersonInterface;
  onDestroy: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Person: FC<PersonProps> = ({ person, onDestroy }) => {
  return (
    <li>
      {person.name}: {person.number}
      <button onClick={onDestroy}>delete</button>
    </li>
  );
};
interface PersonsProps {
  persons: PersonInterface[];
  onDestroy: (id: number, name: string) => void;
}
const Persons: FC<PersonsProps> = ({ persons, onDestroy }) => {
  const rows = () =>
    persons.map(person => (
      <Person
        key={person.name}
        person={person}
        onDestroy={() => onDestroy(person.id, person.number)}
      />
    ));
  return (
    <>
      <ul>{rows()}</ul>
    </>
  );
};

export default Persons;
