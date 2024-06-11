import { useState } from "react";
import Person from "./components/Person";

function areTheseObjectsEqual(first, second) {
  "use strict";

  // If the value of either variable is empty
  // we can instantly compare them and check
  // for equality.
  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  // If neither are empty, we can check if
  // their constructors are equal. Because
  // constructors are objects, if they are
  // equal, we know the objects are of the
  // same type (though not necessarily of
  // the same value).
  if (first.constructor !== second.constructor) {
    return false;
  }

  // If we reach this point, we know both
  // objects are of the same type so all
  // we need to do is check what type one
  // of the objects is, and then compare
  // them
  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  // Throught back to the equlity check
  // we started with. Just incase we are
  // comparing simple objects.
  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  // If the value of check we saw above
  // failed and the objects are Dates,
  // we know they are not Dates because
  // Dates would have equal valueOf()
  // values.
  if (first instanceof Date) return false;

  // If the objects are arrays, we know
  // they are not equal if their lengths
  // are not the same.
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  // If we have gotten to this point, we
  // need to just make sure that we are
  // working with objects so that we can
  // do a recursive check of the keys and
  // values.
  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  // We now need to do a recursive check
  // on all children of the object to
  // make sure they are deeply equal
  const firstKeys = Object.keys(first);

  // Here we just make sure that all the
  // object keys on this level of the
  // object are the same.
  const allKeysExist = Object.keys(second).every(
    (i) => firstKeys.indexOf(i) !== -1
  );

  // Finally, we pass all the values of our
  // of each object into this function to
  // make sure everything matches
  const allKeyValuesMatch = firstKeys.every((i) =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const alreadyExist = persons.some(
      (person) => newPerson.name === person.name
    );
    if (alreadyExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons =
    filter.trim().length === 0
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase().trim())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with: <input value={filter} onChange={handleChangeFilter} />
      </div>
      <br />
      <h2>Add new phone</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((p) => (
        <Person key={p.name} person={p} />
      ))}
    </div>
  );
};

export default App;
