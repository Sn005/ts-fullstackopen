import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import Note from "./components/Note";
import { Note as NoteInterface } from "./services/notes/models";
import noteService from "./services/notes/api";

import "./App.css";

const App: FC = () => {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const noteToShow = showAll ? notes : notes.filter(note => note.important);
  const toggleImportanceOf = async (id: number) => {
    const note = notes.find(n => n.id === id);
    if (note === undefined) return;
    const changedNote = { ...note, important: !note.important };
    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
    } catch (e) {
      alert(`the note '${note.content}' was already deleted from server`);
      setNotes(notes.filter(n => n.id !== id));
    }
  };
  const rows = () =>
    noteToShow.map(note => (
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
      />
    ));
  const addNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: NoteInterface = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };
    const returnedNote = await noteService.create(noteObject);
    console.log(returnedNote);
    setNotes([...notes, returnedNote]);
    setNewNote("");
  };

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const hook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const initialNotes = await noteService.getAll();
      setNotes(initialNotes);
    };
    asyncSetNotes();
  };
  useEffect(hook, []);
  console.log("render", notes!.length, "notes");
  return (
    <div className="App">
      <h1>Notes</h1>
      <div>{rows()}</div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
