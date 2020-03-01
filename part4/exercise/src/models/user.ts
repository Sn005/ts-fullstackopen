import * as dotenv from "dotenv";
import mongoose, { Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { BlogType } from "./blog";

dotenv.config();

type UserType = {
  username: string;
  name: string;
  passwordHash: string;
  blogs: BlogType[];
};
const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});
userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model<UserType & Document>("User", userSchema);
export default User;
