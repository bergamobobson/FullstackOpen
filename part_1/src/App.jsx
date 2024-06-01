import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        <strong>{text}</strong>
      </td>
      <td>
        <strong>{value}</strong>
      </td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const average = (good + neutral + bad) / 3.0;
  const total = good + neutral + bad;
  const positive = (good / total) * 100;
  return (
    <>
      <h3>Statistics</h3>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(2) + "%"} />
      </table>
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

  const footer =
    good == 0 && neutral == 0 && bad == 0 ? (
      <p>No feedbacks yet</p>
    ) : (
      <Statistics good={good} neutral={neutral} bad={bad} />
    );
  return (
    <div>
      <Header text="Give Feedbacks" />
      <Button handleClick={handleGood} text="GOOD" />
      <Button handleClick={handleNeutral} text="NEUTRAL" />
      <Button handleClick={handleBad} text="BAD" />
      {footer}
    </div>
  );
};
export default App;
