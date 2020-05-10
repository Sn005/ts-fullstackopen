import mongoose, { Document } from "mongoose";

type PersonType = {
  name: string;
  phone?: string;
  street: string;
  city: string;
};

const personSchema = new mongoose.Schema<PersonType>({
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

export type PersonModelType = PersonType & Document;
const Person = mongoose.model<PersonModelType>("Person", personSchema);
export default Person;
