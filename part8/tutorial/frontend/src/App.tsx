import React, { FC, useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ALL_PERSONS, FIND_PERSON, CREATE_PERSON, EDIT_NUMBER } from "./query";
import "./App.css";

type AddressType = {
  street: string;
  city: string;
};
type PersonType = {
  name: string;
  phone?: string;
  address: AddressType;
  id: string;
};

type PersonData = {
  allPersons: PersonType[];
  findPerson: PersonType;
  editNumber: PersonType;
};

const Persons: FC<{ persons: PersonData | undefined }> = ({ persons }) => {
  const [person, setPerson] = useState<PersonType | null>(null);
  const [getPerson, result] = useLazyQuery<PersonData>(FIND_PERSON, {
    variables: { nameToSearch: "" },
  });
  const showPerson = async (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result.data]);

  if (persons === undefined) return null;
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
      {persons.allPersons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

const PersonForm: FC<{
  setError: (e: string) => void;
}> = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createPerson] = useMutation<PersonType>(CREATE_PERSON, {
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

const PhoneForm: FC<{ setError: (e: string) => void }> = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [editNumber, result] = useMutation<{ editNumber: PersonData }>(
    EDIT_NUMBER
  );

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found");
    }
  }, [result.data]);
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

function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loading, data: persons } = useQuery<PersonData>(ALL_PERSONS);
  if (persons) {
    console.log(persons.map((v) => v.name));
  }

  if (loading) {
    return <div>loading...</div>;
  }
  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={persons} />
      <h2>Create Person</h2>
      <PersonForm setError={notify} />
      <h2>Change number</h2>
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
