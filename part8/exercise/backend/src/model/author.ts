import mongoose, { Document } from "mongoose";
import { AuthorType } from "../type/author";

const schema = new mongoose.Schema<AuthorType>({
  name: {
    type: String,
    required: true,
  },
  born: Number,
});

export type AuthorModelType = AuthorType & Document;
export const AuthorModel = mongoose.model<AuthorModelType>("Author", schema);
