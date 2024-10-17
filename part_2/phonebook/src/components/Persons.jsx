const Persons = ({filterPersons}) => {
    
    return (
        <>
        {filterPersons.map(person => <p key={person.id}>{person.name} {person.telephone}</p>)}
        </>
    )

}

export default Persons