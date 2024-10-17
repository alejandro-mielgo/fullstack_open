const Part = (props) => {
    console.log("props de Part",props)
    return(
      <>
        <p>{props.part} {props.exercise}</p>
      </>
    )
  }

  export default Part