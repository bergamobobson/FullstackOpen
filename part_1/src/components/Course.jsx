const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
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

const CourseContentStat = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <CourseContentStat key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
