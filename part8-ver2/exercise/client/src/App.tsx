import React, { FC, useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import { Author, AllBooksQuery, AllAuthorsQuery } from "./gen-types";
import { AuthorBirthYearForm } from "./components/AuthorBirthYearForm";
import { Authors } from "./components/Authors";
import { BookForm } from "./components/BookForm";
import { Books } from "./components/Books";
import { LoginForm } from "./components/LoginForm";
// import * as types from "./types";
import "./App.css";

type ShowViewsType = "authors" | "books" | "addBook";
function App() {
  const [token, setToken] = useState<string | null>(null);
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
