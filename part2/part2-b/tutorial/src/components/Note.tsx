import React, { FC } from "react";

export interface NoteProps {
  id: number;
  content: string;
  date: string;
  important: boolean;
}

const Note: FC<{ note: NoteProps }> = ({ note }) => {
  return <li>{note.content}</li>;
};
export default Note;
