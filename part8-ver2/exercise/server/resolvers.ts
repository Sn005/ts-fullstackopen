import { UserInputError } from "apollo-server";
import { v1 as uuid } from "uuid";
import { Resolvers, Author, Book } from "./gen-types";

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];
export const resolvers: Resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author, genre } = args;
      if (author && genre === undefined)
        return books.filter((book) => book.author === author);
      if (genre && author === undefined)
        return books.filter((book) => book.genres.includes(genre));
      if (author && genre)
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        );
      return books;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root: Author) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      const isExitAuthor = !!authors.find(
        (author) => author.name === args.author
      );
      if (!isExitAuthor) {
        authors = [
          ...authors,
          { name: args.author, born: undefined, id: uuid() },
        ];
      }
      const newBook = {
        ...args,
        id: uuid(),
      };
      books = [...books, newBook];
      return newBook;
    },
    editAuthor: (root, args) => {
      const isExitAuthor = !!authors.find(
        (author) => author.name === args.name
      );
      if (!isExitAuthor) return null;
      const updatedAuthor = {
        name: args.name,
        born: args.setBornTo,
      };
      authors = authors.map((author) => {
        if (author.name !== args.name) return author;
        return { ...author, ...updatedAuthor };
      });
      return updatedAuthor;
    },
  },
};
