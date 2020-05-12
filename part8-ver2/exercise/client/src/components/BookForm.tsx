import React, { FC, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, ADD_BOOK } from "../queries";
import { AddBookMutation, AddBookMutationVariables } from "../gen-types";
export const BookForm: FC<{
  setError: (e: string) => void;
}> = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState<number | undefined>(undefined);
  const [genres, setGenres] = useState<string[]>([]);

  const [addBook] = useMutation<AddBookMutation, AddBookMutationVariables>(
    ADD_BOOK,
    {
      refetchQueries: [
        {
          query: ALL_BOOKS,
        },
      ],
      onError: (error) => {
        setError(error.graphQLErrors[0].message);
      },
    }
  );
  const inputGenreEl = useRef<HTMLInputElement>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (published === undefined) return;
    await addBook({
      variables: { title, author, published, genres },
    });

    setTitle("");
    setAuthor("");
    setPublished(undefined);
    setGenres([]);
  };
  const onSetGenres = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputGenreEl.current === null) return;
    setGenres([...genres, inputGenreEl.current.value]);
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published{" "}
          <input
            type="text"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input ref={inputGenreEl} type="text" />
          <button onClick={onSetGenres}>add genre</button>
          <br />
          genres:{genres.join(" ")}
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
