import React, { FC, useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ALL_PERSONS, FIND_PERSON, CREATE_PERSON, EDIT_NUMBER } from "./query";
import {
  AllPersonsQuery,
  Person,
  FindPersonByNameQuery,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  EditNumberMutation,
  EditNumberMutationVariables,
} from "./gen-types";

const PersonForm: FC<{
  setError: (e: string) => void;
}> = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createPerson] = useMutation<
    CreatePersonMutation,
    CreatePersonMutationVariables
  >(CREATE_PERSON, {
    refetchQueries: [
      {
        query: ALL_PERSONS,
      },
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPerson({
      variables: { name, phone, street, city },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

const Persons: FC<{ persons: Pick<Person, "name" | "phone" | "id">[] }> = ({
  persons,
}) => {
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
const PhoneForm: FC<{ setError: (e: string) => void }> = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [editNumber, { data }] = useMutation<
    EditNumberMutation,
    EditNumberMutationVariables
  >(EDIT_NUMBER);

  useEffect(() => {
    if (data && data.editNumber === null) {
      setError("person not found");
    }
  }, [data]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editNumber({
      variables: { name, phone },
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};
const Notify = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const { loading, data } = useQuery<AllPersonsQuery>(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  if (loading) {
    return <div>loading...</div>;
  }
  if (data === undefined) {
    return null;
  }
  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
