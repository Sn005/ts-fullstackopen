import React, { FC, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { LoginMutation } from "../gen-types";

type Props = {
  setError: (errorMessage: string) => void;
  setToken: (token: string) => void;
};
export const LoginForm: FC<Props> = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation<LoginMutation>(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data && result.data.login) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
