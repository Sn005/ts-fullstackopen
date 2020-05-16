import React, { FC, useState, useEffect } from "react";
import {
  useQuery,
  useApolloClient,
  useLazyQuery,
  useSubscription,
} from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import {
  Author,
  AllBooksQuery,
  AllBooksQueryVariables,
  AllAuthorsQuery,
  BookAddedSubscription,
} from "./gen-types";
import { AuthorBirthYearForm } from "./components/AuthorBirthYearForm";
import { Authors } from "./components/Authors";
import { BookForm } from "./components/BookForm";
import { Books } from "./components/Books";
import { LoginForm } from "./components/LoginForm";
// import * as types from "./types";
import "./App.css";

type ShowViewsType = "authors" | "books" | "addBook" | "login";
function App() {
  const client = useApolloClient();
  const [token, setToken] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<ShowViewsType>("authors");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loading: authorsLoading, data: authorsData } = useQuery<
    AllAuthorsQuery
  >(ALL_AUTHORS);

  const [getBooks, { loading: booksLoading, data: booksData }] = useLazyQuery<
    AllBooksQuery,
    AllBooksQueryVariables
  >(ALL_BOOKS);

  useSubscription<BookAddedSubscription>(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;
      alert(subscriptionData.data.bookAdded.title);
    },
  });

  useEffect(() => {
    getBooks();
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setSelectedView("authors");
  };
  const login = (taken: string) => {
    setToken(taken);
    setSelectedView("authors");
  };

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const fetchBooks = (genre: string) => {
    getBooks({ variables: { genre } });
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
        return <Books fetchBooks={fetchBooks} books={booksData.allBooks} />;
      case "addBook":
        return <BookForm setError={notify} />;
      case "login":
        return <LoginForm setToken={login} setError={notify} />;
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = selectedView;
        return null;
      }
    }
  };

  if (authorsLoading || booksLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <button onClick={() => setSelectedView("authors")}>auhotrs</button>
      <button onClick={() => setSelectedView("books")}>books</button>
      {token ? (
        <>
          <button onClick={() => setSelectedView("addBook")}>addBooks</button>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <button onClick={() => setSelectedView("login")}>login</button>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <CurrentView selectedView={selectedView} />
    </>
  );
}

export default App;
