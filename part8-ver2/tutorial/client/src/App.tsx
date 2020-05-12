import React, { FC, useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { ALL_PERSONS, EDIT_NUMBER } from "./queries";
import { AllPersonsQuery } from "./gen-types";
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

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const client = useApolloClient();
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
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
