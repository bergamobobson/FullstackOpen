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

const Total = ({ course }) => {
  return (
    <h3>
      Total of {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
      exercises
    </h3>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />

      <Content course={course} />

      {<Total course={course} />}
    </div>
  );
};

export default Course;
