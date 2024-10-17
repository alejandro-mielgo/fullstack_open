import Part from "./Part"
const Content = ({course}) => {

  const total = course.parts.reduce( (accumulator,part) => accumulator + part.exercises, 0 )

    console.log("props de Content",course)
    return(
      <>
        <Part part = {course.parts[0].name} exercise = {course.parts[0].exercises} />
        <Part part = {course.parts[1].name} exercise = {course.parts[1].exercises} />
        <Part part = {course.parts[2].name} exercise = {course.parts[2].exercises} />
        <p>total of {total} </p>
      </>
    )
  }

  export default Content
  