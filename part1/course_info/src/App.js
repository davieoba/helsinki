
const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Footer = () => {
  return (
    <div>Course info app created by <a href="https://github.com/davieoba">davieoba</a></div>
  )
}

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} <span></span>
        {exercise}
      </p>
    </>
  )
}

const Content = ({ props }) => {
  return (
    <>
      <Part part={props[0].name} exercise={props[0].exercises1} />
      <Part part={props[1].name} exercise={props[1].exercises2} />
      <Part part={props[2].name} exercise={props[2].exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises1: 10
    },

    {
      name: 'Using props to pass data',
      exercises2: 7
    },

    {
      name: 'State of a component',
      exercises3: 14
    }
  ]

  return (
    <div>
      <Header text={course} />

      <Content props={parts} />

      <Total
        exercise1={parts[0].exercises1}
        exercise2={parts[1].exercises2}
        exercise3={parts[2].exercises3}
      />

      <Footer />
    </div>
  )
}
export default App
