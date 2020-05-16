import { UserInputError, AuthenticationError, PubSub } from "apollo-server";
import jwt from "jsonwebtoken";
import { Resolvers } from "./gen-types";
import { AuthorModelType } from "./models/authors";
import { BookModelType } from "./models/books";
import { JWT_SECRET } from "./config";

const pubsub = new PubSub();
export const resolvers: Resolvers = {
  Query: {
    bookCount: (root, args, ctx) => ctx.models.book.collection.countDocuments(),
    authorCount: (root, args, ctx) =>
      ctx.models.author.collection.countDocuments(),
    allBooks: async (root, args, { currentUser, models }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { authorName, genre } = args;
      const author = authorName
        ? await models.author.findOne({ name: authorName })
        : null;
      if (genre && !author)
        return models.book.find({ genres: { $in: [genre] } });
      if (author) {
        return genre
          ? models.book.find({
              author: author._id,
              genres: { $in: [genre] },
            })
          : models.book.find({ author: author._id });
      }
      return models.book.find({});
    },
    allAuthors: async (root, args, ctx) => ctx.models.author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root: AuthorModelType, args, ctx) => {
      try {
        const books = await ctx.models.book.findOne({ author: root.id });
        if (books === null) return;
        return books.collection.countDocuments();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Book: {
    author: async (root: BookModelType, args, ctx) => {
      try {
        const author = await ctx.models.author.findOne({ _id: root.author });
        if (author === null) return;
        return {
          name: author.name,
          id: author.id,
          born: author.born,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addBook: async (root, args, ctx) => {
      const authorName = args.author;
      try {
        const exitAuthor = await ctx.models.author.findOne({
          name: authorName,
        });
        const newAuthor =
          !exitAuthor && new ctx.models.author({ name: authorName });
        if (newAuthor) {
          await newAuthor.save();
        }
        const newBook = new ctx.models.book({
          ...args,
          author: exitAuthor ? exitAuthor._id : newAuthor && newAuthor._id,
        });
        await newBook.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser, models }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await models.author.findOne({ name: args.name });
      if (author === null) {
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
    createUser: (root, args, ctx) => {
      const user = new ctx.models.user({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args, ctx) => {
      const user = await ctx.models.user.findOne({ username: args.username });
      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
