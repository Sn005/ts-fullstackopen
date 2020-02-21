import * as dotenv from "dotenv";
dotenv.config();

import mongoose, { Document } from "mongoose";

type BlogType = {
  title: string;
  author: string;
  url: string;
  likes: number;
};
const blogSchema = new mongoose.Schema<BlogType>({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = mongoose.model<BlogType & Document>("Blog", blogSchema);
export default Blog;
