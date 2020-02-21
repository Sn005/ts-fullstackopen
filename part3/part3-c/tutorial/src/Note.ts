import * as dotenv from "dotenv";
dotenv.config();

import mongoose, { Document } from "mongoose";

const url = process.env.MONGODB_URI as string;
// const password = "GiwJTHN6";

// const url = `mongodb+srv://fullstack:${password}@full-stack-open-tbpvi.gcp.mongodb.net/note-app?retryWrites=true&w=majority`;

console.log("connecting to", url);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

type NoteType = {
  id: number;
  content: string;
  important: boolean;
};
const noteSchema = new mongoose.Schema<NoteType>({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Note = mongoose.model<NoteType & Document>("Note", noteSchema);
export default Note;
