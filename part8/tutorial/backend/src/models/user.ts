import mongoose, { Document } from "mongoose";
import { User } from "../type/user";

const schema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"
    }
  ]
});

const User = mongoose.model<User & Document>("User", schema);
export default User;
