import Person from "./Person";

const ShowPhone = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person key={p.name} person={p} />
      ))}
    </>
  );
};

export default ShowPhone;
