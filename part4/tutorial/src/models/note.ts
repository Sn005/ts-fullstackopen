import * as dotenv from "dotenv";
dotenv.config();

import mongoose, { Document } from "mongoose";

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
