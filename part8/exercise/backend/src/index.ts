import dotenv from "dotenv";
import { v1 as uuid } from "uuid";
import mongoose from "mongoose";
import {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} from "apollo-server";
import jwt from "jsonwebtoken";
import { AuthorType } from "./type/author";
import { BookType } from "./type/book";
import { BookModel, BookModelType } from "./model/book";
import { AuthorModel, AuthorModelType } from "./model/author";

dotenv.config();
mongoose.set("useFindAndModify", false);
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI as string, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      authorName: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => BookModel.collection.countDocuments(),
    authorCount: () => AuthorModel.collection.countDocuments(),
    allBooks: (_: void, args: { author?: string; genre?: string }) => {
      const { author, genre } = args;
      if (author && genre === undefined)
        return BookModel.find({ author: { $in: [author] } });
      if (genre && author === undefined)
        return BookModel.find({ genres: { $in: [genre] } });
      if (author && genre)
        return BookModel.find({
          author: { $in: [author] },
          genres: { $in: [genre] },
        });
      return BookModel.find({});
    },
    allAuthors: () => {
      return AuthorModel.find({});
    },
  },
  Author: {
    bookCount: (root: { name: string }) =>
      BookModel.collection.countDocuments({ author: root.name }),
  },
  Mutation: {
    addBook: async (
      _: void,
      args: {
        title: string;
        authorName: string;
        published: number;
        genres: string[];
      }
    ) => {
      try {
        // await newBook.save();
        // console.log(newBook);
        // fixme: authorがちゃんと保存されていない
        const authorName = args.authorName;
        const isExitAuthor = await AuthorModel.findOne({
          name: authorName,
        });
        let newAuthor;
        if (!isExitAuthor) {
          newAuthor = new AuthorModel({ name: authorName });
          console.log(isExitAuthor);
          console.log(newAuthor);
          await newAuthor.save();
        }
        const newBook = new BookModel({
          ...args,
          author: isExitAuthor ? isExitAuthor._id : newAuthor?._id,
        });
        await newBook.save();
        return newBook;
      } catch (error) {
        console.log("author");
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (
      _: void,
      args: {
        name: string;
        born: number;
      }
    ) => {
      const author = await AuthorModel.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.born;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
