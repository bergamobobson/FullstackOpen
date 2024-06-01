import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Footer = ({ good, neutral, bad }) => {
  const average = (good + neutral + bad) / 3.0;
  const total = good + neutral + bad;
  const positive = (good / total) * 100;
  return (
    <>
      <h3>Statistics</h3>
      <p style={{ margin: 0 }}>good {good}</p>
      <p style={{ margin: 0 }}>neutral {neutral}</p>
      <p style={{ margin: 0 }}>bad {bad}</p>
      <p style={{ margin: 0 }}>average {average}</p>
      <p style={{ margin: 0 }}>total {total}</p>
      <p style={{ margin: 0 }}>positive {positive} %</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGood} text="GOOD" />
      <Button handleClick={handleNeutral} text="NEUTRAL" />
      <Button handleClick={handleBad} text="BAD" />
      <Footer good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
