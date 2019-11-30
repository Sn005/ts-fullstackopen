import React, { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import { Person } from "./domains/Person";
import "./App.css";

const App: FC = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "080-1111-0000" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilteredName, setNewFilteredName] = useState("");
  const personsToShow = !newFilteredName
    ? persons
    : persons.filter((person: Person) => person.name.includes(newFilteredName));

  const addNumber = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const isExist: boolean = persons.some((person: Person) => {
      return person.name === newName;
    });
    if (isExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson: Person = {
      name: newName,
      number: newNumber
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
    setNewFilteredName("");
  };
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const onFilteredChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewFilteredName(event.target.value);
  };
  const hook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const { data } = await axios.get<Person[]>(
        "http://localhost:3001/persons"
      );
      setPersons(data);
    };
    asyncSetNotes();
  };
  useEffect(hook, []);
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <Filter onChange={onFilteredChange} value={newFilteredName} />
        <h3>add a new</h3>
        <PersonForm
          onNameChange={onNameChange}
          onNumberChange={onNumberChange}
          nameValue={newName}
          numberValue={newNumber}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
