import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import person from "./models/person";
import { connectToDb } from "./db";
export type Context = {
  models: {
    person: typeof person;
  };
};
const context: Context = {
  models: {
    person,
  },
};
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers as any,
  context,
});
connectToDb();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
