const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((element) => (
        <Part
          key={element.id}
          part={element.name}
          exercise={element.exercises}
        />
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />

      <Content course={course} />

      {/*<Total course={course} />*/}
    </div>
  );
};

export default Course;
