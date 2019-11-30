import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { NoteProps } from "./components/Note";

import "./App.css";

const App: FC = () => {
  const [notes, setNotes] = useState<NoteProps[] | []>([]);
  const hook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const response = await axios.get("http://localhost:3001/notes");
      setNotes(response.data);
    };
    asyncSetNotes();
  };
  useEffect(hook, []);
  console.log("render", notes!.length, "notes");
  return (
    <div className="App">
      <h1>Notes</h1>
      <div></div>
    </div>
  );
};

export default App;
