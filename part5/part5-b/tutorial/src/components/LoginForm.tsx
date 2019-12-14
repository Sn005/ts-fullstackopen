import React, { FC, ChangeEvent, FormEvent } from "react";

interface LoginFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleUsernameChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  username: string;
  password: string;
}
const LoginForm: FC<LoginFormProps> = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
