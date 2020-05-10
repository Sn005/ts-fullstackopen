// import mongoose, { Document } from "mongoose";

// type UserType = {
//   username: string;
//   notes: Person[];
// };

// const schema = new mongoose.Schema<UserType>({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 3,
//   },
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Person",
//     },
//   ],
// });

// const User = mongoose.model<UserType & Document>("User", schema);
// export default User;
