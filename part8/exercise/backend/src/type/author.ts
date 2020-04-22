import { ObjectId } from "mongodb";
export type AuthorType = {
  _id: ObjectId;
  name: string;
  born?: number;
};
