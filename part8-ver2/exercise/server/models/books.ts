import mongoose, { Document } from "mongoose";
import { AuthorModelType } from "./authors";
type BookType = {
  title: string;
  published: number;
  author: string;
  genres: string[];
};

const schema = new mongoose.Schema<BookType>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: Number,
  genres: Array,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

export type BookModelType = BookType & Document;
export const book = mongoose.model<BookModelType>("Book", schema);
