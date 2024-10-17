import Part from "./Part"
const Content = ({course}) => {

  const total = course.parts.reduce( (accumulator,part) => accumulator + part.exercises, 0 )
  console.log("props de Content",course)
  return(
      <>
        {course.parts.map(part => <Part part = {part.name} exercise = {part.exercises} /> )}
        <p>total of <strong>{total}</strong> exercises </p>
      </>
    )
  }

  export default Content
  