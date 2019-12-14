import React, {
  FC,
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent
} from "react";
import Note from "./components/Note";
import LoginForm from "./components/LoginForm";
import Togglable, { TogglableHandler } from "./components/Togglable";
import NoteForm from "./components/NoteForm";
import { Note as NoteInterface } from "./services/notes/models";
import noteService from "./services/notes/api";
import loginService from "./services/login";
import { AuthResponse } from "./services/login/model";

import "./App.css";

const App: FC = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
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
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const noteFormRef = React.createRef<TogglableHandler>();
  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm
        onSubmit={addNote}
        value={newNote}
        handleChange={handleNoteChange}
      />
    </Togglable>
  );
  const addNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    noteFormRef!.current!.toggleVisibility();
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
  return (
    <div className="App">
      <h1>Notes</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <div>{rows()}</div>
    </div>
  );
};

export default App;
