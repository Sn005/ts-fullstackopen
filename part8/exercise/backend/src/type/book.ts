import { ObjectId } from "mongodb";
import { AuthorType } from "../type/author";
export type BookType = {
  title: string;
  published: number;
  author: string;
  _id: ObjectId;
  genres: string[];
};
