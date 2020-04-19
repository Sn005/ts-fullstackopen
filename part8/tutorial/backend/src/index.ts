import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} from "apollo-server";
import jwt from "jsonwebtoken";
import { Person as PersonType } from "./type/person";
import { User as UserType } from "./type/user";
import Person, { PersonModelType } from "./models/person";
import User from "./models/user";
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
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
`;

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (_: void, args: { phone: "YES" | "NO" }) => {
      if (!args.phone) {
        return Person.find({});
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: (_: void, args: { name: string }) =>
      Person.findOne({ name: args.name }),
    me: (root: void, args: void, context: { currentUser: string }) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root: { street: string; city: string }) => {
      const { street, city } = root;
      return {
        street,
        city,
      };
    },
  },
  Mutation: {
    addPerson: async (
      _: void,
      args: {
        name: string;
        phone: string;
        street: string;
        city: string;
      }
    ) => {
      const person = new Person({ ...args });
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    editNumber: async (_: void, args: PersonType) => {
      const person = await Person.findOne({ name: args.name });
      if (person === null) return;
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    createUser: (_: void, args: UserType) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_: void, args: UserType & { password: string }) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addAsFriend: async (
      root: void,
      args: { name: string },
      {
        currentUser,
      }: { currentUser: PersonModelType & { friends: PersonType[] } }
    ) => {
      const nonFriendAlready = (person: PersonType) =>
        !currentUser.friends.map((f) => f._id).includes(person._id);
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const person = await Person.findOne({ name: args.name });
      if (person === null) return;
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      await currentUser.save();
      return currentUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as {
        id: string;
      };
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
