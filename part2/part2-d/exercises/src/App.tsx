import React, { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import { Person } from "./services/persons/models";
import personService from "./services/persons/api";
import "./App.css";

const App: FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilteredName, setNewFilteredName] = useState("");
  const personsToShow = !newFilteredName
    ? persons
    : persons.filter((person: Person) => person.name.includes(newFilteredName));

  const addNumber = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isExist: boolean = persons.some((person: Person) => {
      return person.name === newName;
    });
    if (isExist) {
      await updateNumber();
    } else {
      await addNewPerson();
    }
  };
  const updateNumber = async () => {
    if (!window.confirm(`${newName}は存在しますが、電話番号を更新しますか？`))
      return;
    const person = persons.find((person: Person) => {
      return person.name === newName;
    });
    if (!person) return;
    const newPerson: Person = {
      ...person,
      number: newNumber
    };

    try {
      const updatedPerson = await personService.update(person.id, newPerson);
      const newPersons = persons.filter(
        person => person.id !== updatedPerson.id
      );
      setPersons([...newPersons, updatedPerson]);
      resetInputValues();
    } catch (e) {
      console.log(e);
    }
  };
  const addNewPerson = async () => {
    const newPerson: Person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    try {
      const result = await personService.create(newPerson);
      setPersons([...persons, result]);
      resetInputValues();
    } catch (e) {
      console.log(e);
    }
  };
  const resetInputValues = () => {
    setNewName("");
    setNewNumber("");
    setNewFilteredName("");
  };
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewName(event.target.value);
  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewNumber(event.target.value);

  const onDestroy = async (id: number, name: string) => {
    if (!window.confirm(`${name}を削除してもよろしいですか？`)) return;
    try {
      await personService.destroy(id);
      const result = await personService.getAll();
      setPersons(result);
    } catch (e) {
      console.log(e);
    }
  };
  const onFilteredChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewFilteredName(event.target.value);
  };
  const hook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const initialPersons = await personService.getAll();
      setPersons(initialPersons);
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
      <Persons persons={personsToShow} onDestroy={onDestroy} />
    </div>
  );
};

export default App;
