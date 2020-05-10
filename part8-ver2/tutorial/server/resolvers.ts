import { UserInputError } from "apollo-server";
import { Resolvers, Address } from "./gen-types";
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
      try {
        await person.save();
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
  },
};
