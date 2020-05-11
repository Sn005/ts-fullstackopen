import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectToDb = () => {
  mongoose.set("useFindAndModify", false);
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log("connecting to", MONGODB_URI);
  mongoose
    .connect(MONGODB_URI as string, { useNewUrlParser: true })
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message);
    });
};
