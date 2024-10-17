const Header = ({course}) => {
    console.log("props de Header",course)
    return(
        <h1>{course.name}</h1>
    )
  }

export default Header