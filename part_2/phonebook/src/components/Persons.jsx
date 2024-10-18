import phonebookService from '../services/phonebookService'
import axios from 'axios'



const Persons = ({ persons, deleteContact }) => {
    
    return (
        <>
            {persons.map(person => {
                return(
                    <div key={person.id}>
                        <label>{person.name} : {person.number}</label>
                        <button onClick={()=>deleteContact(person.id, person.name)}>Delete contact</button>
                    </div>
            )
            })}
        
        </> 
    )
       
}

export default Persons