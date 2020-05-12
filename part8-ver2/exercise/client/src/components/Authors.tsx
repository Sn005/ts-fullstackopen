import React, { FC } from "react";
import { Author } from "../gen-types";

export const Authors: FC<{
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
