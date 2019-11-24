import React, { FC } from "react";
import { Person as PersonInterface } from "../domains/Person";

const Person: FC<{ person: PersonInterface }> = ({ person }) => {
  return (
    <li>
      {person.name}: {person.number}
    </li>
  );
};

const Persons: FC<{ persons: PersonInterface[] }> = ({ persons }) => {
  const rows = () =>
    persons.map(person => <Person key={person.name} person={person} />);
  return (
    <>
      <ul>{rows()}</ul>
    </>
  );
};

export default Persons;
