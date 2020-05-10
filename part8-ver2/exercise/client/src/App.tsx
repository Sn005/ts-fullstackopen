import React, { FC, useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR } from "./query";
import {
  Author,
  Book,
  AddBookMutation,
  AddBookMutationVariables,
  EditAuthorMutation,
  EditAuthorMutationVariables,
  AllBooksQuery,
  AllAuthorsQuery,
} from "./gen-types";

// import * as types from "./types";
import "./App.css";

const Authors: FC<{
  authors: Pick<Author, "name" | "born" | "bookCount">[] | undefined | null;
}> = ({ authors, children }) => {
  if (authors === undefined || authors === null) return null;
  return (
    <div>
      <h2>Authors</h2>

      {authors.map((author) => (
        <div key={author.name}>
          {author.name} {author.born} {author.bookCount}
        </div>
      ))}
      {children}
    </div>
  );
};

const Books: FC<{
  books: Pick<Book, "title" | "author" | "published">[] | undefined;
}> = ({ books }) => {
  if (books === undefined) return null;
  return (
    <div>
      <h2>Books</h2>

      {books.map((book) => (
        <div key={book.title}>
          {book.title} {book.author} {book.published}
        </div>
      ))}
    </div>
  );
};

const BookForm: FC<{
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

const AuthorBirthYearForm: FC<{
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
type ShowViewsType = "authors" | "books" | "addBook";
function App() {
  const [selectedView, setSelectedView] = useState<ShowViewsType>("authors");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const CurrentView: FC<{ selectedView: ShowViewsType }> = ({
    selectedView,
  }) => {
    switch (selectedView) {
      case "authors":
        if (!authorsData?.allAuthors) return <></>;
        return (
          <Authors authors={authorsData.allAuthors}>
            <AuthorBirthYearForm
              setError={notify}
              authors={authorsData.allAuthors}
            />
          </Authors>
        );
      case "books":
        if (!booksData?.allBooks) return <></>;
        return <Books books={booksData.allBooks} />;
      case "addBook":
        return <BookForm setError={notify} />;
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = selectedView;
        return null;
      }
    }
  };
  const { loading: authorsLoading, data: authorsData } = useQuery<
    AllAuthorsQuery
  >(ALL_AUTHORS);

  const { loading: booksLoading, data: booksData } = useQuery<AllBooksQuery>(
    ALL_BOOKS
  );
  if (authorsLoading || booksLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <button onClick={() => setSelectedView("authors")}>auhotrs</button>
      <button onClick={() => setSelectedView("books")}>books</button>
      <button onClick={() => setSelectedView("addBook")}>books</button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <CurrentView selectedView={selectedView} />
    </>
  );
}

export default App;
