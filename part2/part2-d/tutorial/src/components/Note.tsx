import React, { FC, MouseEvent } from "react";
import { Note as NoteInterface } from "../services/notes/models";

interface NoteProps {
  note: NoteInterface;
  toggleImportance: (event: MouseEvent<HTMLButtonElement>) => void;
}
const Note: FC<NoteProps> = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
export default Note;
