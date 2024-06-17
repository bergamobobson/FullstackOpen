import Person from "./Person";

const ShowPhone = ({ persons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person
          key={p.name}
          person={p}
          handleDelete={() => handleDelete(p.id)}
        />
      ))}
    </>
  );
};

export default ShowPhone;
