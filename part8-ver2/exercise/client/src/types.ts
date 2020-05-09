export type Author = {
  name: string;
  id: string;
  born?: number;
  bookCount: number;
};
export type AuthorData = {
  allAuthors: Author[];
};

export type Book = {
  title: string;
  published: number;
  author: string;
  id: string;
  genres: string[];
};

export type BookData = {
  allBooks: Book[]
}