const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {confirm(`${newName} is already added to phonebook. Change number?`)}
    </div>
  );
};

export default Notification;
