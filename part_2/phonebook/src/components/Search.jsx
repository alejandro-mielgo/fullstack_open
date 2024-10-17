const Search = (props) => {
    
    return (
        <>
            Search by name: <input onChange={props.handler}/>
        </>
    )
}

export default Search