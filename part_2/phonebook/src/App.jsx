import { useState } from 'react'

import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {

  //estados
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', telephone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', telephone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', telephone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', telephone: '39-23-6423122', id: 4 }
  ])
  const [filterPersons, setFilterPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newTelephone, setNewTelephone] = useState('')

  //Controladores
  const handleFilter = (event) => {
    setFilterPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(filterPersons)
  }
  
  const handleNameInput = (event) => {
    setNewName (event.target.value)
  }

  const handleTelephoneInput = (event) => {
      setNewTelephone (event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const repeatedPersons = persons.filter(person => person.name===newName)
    const  newPerson = { name : newName, telephone : newTelephone, id : persons.length+1 }

    if(repeatedPersons.length !== 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons( persons.concat( newPerson ) )
      setFilterPersons(filterPersons.concat(newPerson))
    }  
}

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
            <Search handler = {handleFilter} />
        </div> 
        <br/><br/>
        <Form handleSubmit={handleSubmit} handleNameInput={handleNameInput} handleTelephoneInput={handleTelephoneInput}/> 
        </div>
          <h2>Numbers</h2>
        <div>
        <Persons filterPersons = {filterPersons} />
      </div>
    </>
  )
}

export default App
