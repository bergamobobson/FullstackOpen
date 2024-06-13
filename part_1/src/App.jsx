import { useEffect, useState } from "react";
import axios from "axios";
import FilterPhone from "./components/FilterPhone";
import AddPhone from "./components/AddPhone";
import ShowPhone from "./components/ShowPhone";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const alreadyExist = persons.some(
      (person) => newPerson.name === person.name
    );
    if (alreadyExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
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
      <FilterPhone filter={filter} handleChangeFilter={handleChangeFilter} />
      <AddPhone
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <ShowPhone persons={filteredPersons} />
    </div>
  );
};

export default App;
