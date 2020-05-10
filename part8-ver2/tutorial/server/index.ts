import { ClientRequest } from "http";
import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import person from "./models/person";
import user, { UserModelType } from "./models/user";
import { connectToDb } from "./db";
import { JWT_SECRET } from "./config";
export type Context = {
  models: {
    person: typeof person;
    user: typeof user;
  };
  currentUser: UserModelType | null;
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers as any,
  context: async ({ req }) => {
    const models = {
      person,
      user,
    };
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as {
        id: string;
      };
      const currentUser = await user
        .findById(decodedToken.id)
        .populate("friends");
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
