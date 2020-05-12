import React, { FC, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../queries";
import { EditNumberMutation, EditNumberMutationVariables } from "../gen-types";

export const PhoneForm: FC<{ setError: (e: string) => void }> = ({
  setError,
}) => {
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
