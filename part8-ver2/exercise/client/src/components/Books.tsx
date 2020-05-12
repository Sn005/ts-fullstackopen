import React, { FC } from "react";
import { Book } from "../gen-types";

export const Books: FC<{
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
