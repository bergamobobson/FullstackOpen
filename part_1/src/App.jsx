/*
 Unfortunately, the entire application is in the same component.
 Refactor the code so that it consists of three new components: Header, Content, and Total. 
 All data still resides in the App component, which passes the necessary data to each component using props. 
 Header takes care of rendering the name of the course, 
 Content renders the parts and their number of exercises 
 and Total renders the total number of exercises.
*/

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return <p>{props.part} {props.exercise}</p>
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  );
};

export default App;
