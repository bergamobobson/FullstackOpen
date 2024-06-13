const FilterPhone = ({ filter, handleChangeFilter }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter show with: <input value={filter} onChange={handleChangeFilter} />
      </div>
    </>
  );
};

export default FilterPhone;
