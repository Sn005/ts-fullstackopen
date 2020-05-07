const { UserInputError } = require("apollo-server");
import { v1 as uuid } from "uuid";
import { Resolvers, Address, Person } from "./gen-types";
// import { persons } from "./data";
// export type Address = {
//   street: string;
//   city: string;
// };
export type PersonType = {
  name: string;
  phone?: string | null;
  street: string;
  city: string;
  id: string;
};

let persons: PersonType[] = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    phone: "040-123543",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];
export const resolvers: Resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person: PersonType) =>
        args.phone === "YES" ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
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
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons = [...persons, person];
      return person;
    },
    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
    },
  },
};
