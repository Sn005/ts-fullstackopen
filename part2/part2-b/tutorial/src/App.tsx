import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import Note, { NoteProps } from "./components/Note";

import "./App.css";

interface AppProps {
  notes: NoteProps[];
}

const App: FC<AppProps> = props => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const noteToShow = showAll ? notes : notes.filter(note => note.important);
  const rows = () => noteToShow.map(note => <Note key={note.id} note={note} />);
  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: NoteProps = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };
    setNotes([...notes, noteObject]);
    setNewNote("");
  };
  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
