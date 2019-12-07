import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import { Note as NoteInterface } from "./services/notes/models";
import noteService from "./services/notes/api";
import loginService from "./services/login";

import "./App.css";

interface User {
  name: string;
  token: string;
}
const App: FC = () => {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const setNotesHook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const initialNotes = await noteService.getAll();
      setNotes(initialNotes);
    };
    asyncSetNotes();
  };
  const setTokenHook =() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }
  useEffect(setNotesHook, []);
  useEffect(setTokenHook, [])
  console.log("render", notes!.length, "notes");
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );
  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <h2>Login</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <div>{rows()}</div>
    </div>
  );
};

export default App;
