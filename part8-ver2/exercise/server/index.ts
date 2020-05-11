import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { connectToDb } from "./db";
import { JWT_SECRET } from "./config";
import { book } from "./models/books";
import { author } from "./models/authors";
import { user, UserModelType } from "./models/users";

export type Context = {
  models: {
    book: typeof book;
    author: typeof author;
    user: typeof user;
  };
  currentUser: UserModelType | null;
};
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers as any,
  context: async ({ req }) => {
    const models = {
      book,
      author,
      user,
    };
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as {
        id: string;
      };
      const currentUser = await user.findById(decodedToken.id);
      return { currentUser, models };
    }
    return {
      models,
    };
  },
});
connectToDb();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
