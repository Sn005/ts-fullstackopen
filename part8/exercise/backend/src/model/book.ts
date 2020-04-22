import mongoose, { Document } from "mongoose";
import { BookType } from "../type/book";

const schema = new mongoose.Schema<BookType>({
  title: String,
  published: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

export type BookModelType = BookType & Document;
export const BookModel = mongoose.model<BookModelType>("Book", schema);
