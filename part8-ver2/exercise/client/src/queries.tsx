import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query allBooks($authorName: String, $genre: String) {
    allBooks(authorName: $authorName, genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      id
      born
      bookCount
    }
  }
`;
