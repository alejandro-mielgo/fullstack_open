const Header = (props) => {
  console.log("props de Header",props)
  return(
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log("props de Part",props)
  return(
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}
const Content = (props) => {
  console.log("props de Content",props)
  return(
    <>
      <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises} />
      <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises} />
      <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return(
    <>
      <p>Total: {total}</p>
    </>    
  )
}

const App = () => {
  const course = {
  name : 'Half Stack aplication developement',
  parts : [{
    name: "Fundamentals of React",
    exercises: 10
  },
  {
    name: "Using props to pass data",
    exercises: 7
  },
  {
    name: "State of a component",
    exercises: 14
  }]
}
  console.log("objeto course",course)
   

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />

    </div>
  
  )
}
export default App
