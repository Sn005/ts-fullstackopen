import React, { FC, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import {
  Author,
  EditAuthorMutation,
  EditAuthorMutationVariables,
} from "../gen-types";

export const AuthorBirthYearForm: FC<{
  setError: (e: string) => void;
  authors: Pick<Author, "name">[] | undefined;
}> = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState<number | "">("");
  const [editAuthor] = useMutation<
    EditAuthorMutation,
    EditAuthorMutationVariables
  >(EDIT_AUTHOR, {
    refetchQueries: [
      {
        query: ALL_AUTHORS,
      },
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (born === "") return;
    await editAuthor({
      variables: { name, born },
    });
    setName("");
    setBorn("");
  };
  const onChangeAuthor = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setName(e.currentTarget.value);
  };
  if (authors === undefined) return null;
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          author{" "}
          <select value={name} onChange={onChangeAuthor}>
            <option value="">著者を選択してください。</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
