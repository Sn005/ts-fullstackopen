import React, { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";
import { AllPersonsQuery, PersonAddedSubscription, Person } from "./gen-types";
import { LoginForm } from "./components/LoginForm";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { PhoneForm } from "./components/PhoneForm";

const Notify = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

type FormatedPerson = Pick<Person, "name" | "phone" | "address" | "id">;

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const client = useApolloClient();
  const { loading, data } = useQuery<AllPersonsQuery>(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateCacheWith = (addedPerson: FormatedPerson) => {
    const includedIn = (set: FormatedPerson[], object: FormatedPerson) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription<PersonAddedSubscription>(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });
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
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }
  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data.allPersons} />
      <PersonForm updateCacheWith={updateCacheWith} setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
