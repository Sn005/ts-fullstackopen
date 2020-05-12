import React, { FC, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries";
import { Person, FindPersonByNameQuery } from "../gen-types";

export const Persons: FC<{
  persons: Pick<Person, "name" | "phone" | "id">[];
}> = ({ persons }) => {
  const [getPerson, result] = useLazyQuery<FindPersonByNameQuery>(FIND_PERSON);
  const [person, setPerson] = useState<
    Pick<Person, "name" | "phone" | "address"> | undefined | null
  >(null);

  const showPerson = (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result.data]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street} {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(({ name, phone }) => {
        if (!name || !phone) return null;
        return (
          <div key={name}>
            {name} {phone}
            <button onClick={() => showPerson(name)}>show address</button>
          </div>
        );
      })}
    </div>
  );
};
