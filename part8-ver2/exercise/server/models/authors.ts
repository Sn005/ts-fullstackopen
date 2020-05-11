import mongoose, { Document } from "mongoose";

type AuthorType = {
  name: string;
  born: number;
};

const schema = new mongoose.Schema<AuthorType>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  born: Number,
});

export type AuthorModelType = AuthorType & Document;
export const author = mongoose.model<AuthorModelType>("Author", schema);
