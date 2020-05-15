import React, { FC, useState, useEffect } from "react";
import { Book } from "../gen-types";

export const Books: FC<{
  books: Pick<Book, "title" | "author" | "published" | "genres">[] | undefined;
  fetchBooks: (genre: string) => void;
}> = ({ books, fetchBooks }) => {
  const genres = ["manga", "anime"];
  const [selectedGenre, setSlelectedGenre] = useState<string | undefined>(
    undefined
  );
  // useEffect(() => {
  //   if (!books) return;
  //   const allGenres = books
  //     .flatMap((book) => book.genres)
  //     .filter((genre) => genre);
  //   setGenres(allGenres as string[]);
  // }, [books]);

  const filterLocalBooks = (genre: string) => {
    fetchBooks(genre);
    setSlelectedGenre(genre);
  };
  if (books === undefined) return <h2>Books</h2>;
  return (
    <div>
      <h2>Books</h2>
      {selectedGenre && <p>in genre {selectedGenre}</p>}
      {books &&
        books.map((book) => (
          <div key={book.title}>
            {book.title} {book.author.name} {book.published}
          </div>
        ))}
      {genres.map((genre) => (
        <button key={genre} onClick={() => filterLocalBooks(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};
