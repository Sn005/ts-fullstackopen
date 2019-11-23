import React, { FC } from "react";
import Note, { NoteProps } from "./components/Note";

import "./App.css";

interface AppProps {
  notes: NoteProps[];
}

const App: FC<AppProps> = ({ notes }) => {
  const rows = () => notes.map(note => <Note key={note.id} note={note} />);
  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;
