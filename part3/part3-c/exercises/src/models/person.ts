import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

type PersonType = {
  name: string;
  number: string;
} & Document;

const personSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true }
});

personSchema.plugin(uniqueValidator);
const Person = mongoose.model<PersonType>("person", personSchema);

export default Person;
