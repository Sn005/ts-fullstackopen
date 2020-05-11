import mongoose, { Document } from "mongoose";

type UserType = {
  username: string;
  favoriteGenre: string;
};

const schema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: String,
});

export type UserModelType = UserType & Document;
export const user = mongoose.model<UserModelType>("User", schema);
