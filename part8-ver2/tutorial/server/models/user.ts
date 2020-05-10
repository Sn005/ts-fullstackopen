import mongoose, { Document } from "mongoose";
import { PersonModelType } from "./person";
type UserType = {
  username: string;
  friends: PersonModelType[];
};

const schema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

export type UserModelType = UserType & Document;
const User = mongoose.model<UserModelType>("User", schema);
export default User;
