import mongoose, { Document } from "mongoose";
import { Person } from "../type/person";

const personSchema = new mongoose.Schema<Person>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  phone: {
    type: String,
    minlength: 5,
  },
  street: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
});

export type PersonModelType = Person & Document;

const Person = mongoose.model<PersonModelType>("Person", personSchema);
export default Person;
