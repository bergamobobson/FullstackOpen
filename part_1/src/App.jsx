import { useState } from "react";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <p style={{ margin: 0 }}>{anecdote}</p>
      <p style={{ margin: 0 }}>has {vote} votes</p>
    </>
  );
};

const Statistic = ({ total, anecdote, vote }) => {
  return (
    <>
      {total === 0 ? (
        <h4>No anecdote has been vote yet</h4>
      ) : (
        <>
          <h1>Anecdote with most votes</h1>
          <Anecdote anecdote={anecdote} vote={vote} />
        </>
      )}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const initializer = anecdotes.reduce((init, _, index) => {
    init[index] = 0;
    return init;
  }, {});
  const [vote, setVote] = useState(initializer);

  const handleSelected = () => {
    const next = Math.floor(Math.random() * anecdotes.length);
    setSelected(next);
  };

  const handleVotes = () => {
    const prevVote = { ...vote }; //because state variable should be immutable
    prevVote[selected] += 1;
    setVote(prevVote);
  };
  const voteMap = new Map(Object.entries(vote));
  const maxIndex = Array.from(voteMap.keys()).reduce((maxKey, key) => {
    return voteMap.get(key) > voteMap.get(maxKey) ? key : maxKey;
  }, Array.from(voteMap.keys())[0]);

  const totalVote = Array.from(voteMap.values()).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return (
    <>
      <h1>Anecdoted of the Days</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={vote[selected]} />
      <button onClick={handleVotes}>Votes</button>
      <button onClick={handleSelected}> next anecdote</button>
      <Statistic
        total={totalVote}
        anecdote={anecdotes[maxIndex]}
        vote={vote[maxIndex]}
      />
    </>
  );
};

export default App;
