/*
 
Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. 
Instead, it only renders three Part components of which each renders the name and number of exercises of one part.
*/

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.content[0].part} exercise={props.content[0].exercise} />
      <Part part={props.content[1].part} exercise={props.content[1].exercise} />
      <Part part={props.content[2].part} exercise={props.content[2].exercise} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const content = [
    {
      part: "Fundamentals of React",
      exercise: 10,
    },

    {
      part: "Using props to pass data",
      exercise: 7,
    },

    {
      part: "State of a component",
      exercise: 14,
    },
  ];

  const total = content.reduce((acc, curr) => acc + curr.exercise, 0)

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  );
};

export default App;
