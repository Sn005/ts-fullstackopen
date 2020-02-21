import mongoose, { Schema, Document } from "mongoose";

type PersonType = {
  name: string;
  number: string;
} & Document;

const personSchema: Schema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model<PersonType>("person", personSchema);

export default Person;
