import { useEffect, useState } from "react";
import FilterPhone from "./components/FilterPhone";
import AddPhone from "./components/AddPhone";
import ShowPhone from "./components/ShowPhone";
import phoneService from "./services/phones";
import phones from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    console.log("newName", newName);
    console.log("newNumber", newNumber);
    const alreadyExist = persons.some(
      (person) => newPerson.name === person.name
    );
    if (alreadyExist) {
      const test = confirm(
        `${newName} is already added to phonebook. Change number?`
      );
      const person = persons.find((p) => p.name === newPerson.name);
      test
        ? phoneService
            .update(person.id, newPerson)
            .then((data) =>
              setPersons(persons.map((p) => (p.id !== data.id ? p : data)))
            )
        : newPerson;
    } else {
      phoneService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    phoneService.cancel(id).then((data) => {
      confirm("are you sure you want to delete ", data.name, "?")
        ? setPersons(persons.filter((p) => p.id !== data.id))
        : setPersons(persons);
    });
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
      <FilterPhone filter={filter} handleChangeFilter={handleChangeFilter} />
      <AddPhone
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <ShowPhone persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
