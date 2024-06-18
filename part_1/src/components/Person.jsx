const Person = ({ person, handleDelete }) => {
  return (
    <>
      <li style={{ listStyleType: "none" }} className="person">
        {person.name} {person.number}
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </li>
    </>
  );
};

export default Person;
