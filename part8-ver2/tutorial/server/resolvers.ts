import { UserInputError, AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { Resolvers, Address, Person } from "./gen-types";
import { JWT_SECRET } from "./config";
import { PersonModelType } from "./models/person";
export const resolvers: Resolvers = {
  Query: {
    personCount: (root, args, ctx) =>
      ctx.models.person.collection.countDocuments(),
    allPersons: async (root, args, ctx) => {
      if (!args.phone) {
        return ctx.models.person.find({});
      }
      return ctx.models.person.find({
        phone: { $exists: args.phone === "YES" },
      });
    },
    findPerson: (root, args, ctx) =>
      ctx.models.person.findOne({ name: args.name }),
  },
  Person: {
    address: (root: Address) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, ctx) => {
      const person = new ctx.models.person({ ...args });
      const currentUser = ctx.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    editNumber: async (root, args, ctx) => {
      const person = await ctx.models.person.findOne({ name: args.name });
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
    createUser: (root, args, ctx) => {
      const user = new ctx.models.user({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args, ctx) => {
      const user = await ctx.models.user.findOne({ username: args.username });
      console.log(user);
      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser, models }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const nonFriendAlready = (person: PersonModelType) =>
        !currentUser.friends.map((f) => f._id).includes(person._id);
      const person = await models.person.findOne({ name: args.name });
      if (person === null) {
        throw new UserInputError("not exist person");
      }
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
  },
};
