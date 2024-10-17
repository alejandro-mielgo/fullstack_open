import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      telephone: "040-1234567"
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newTelephone, setNewTelephone] = useState('')

  const handleNameInput = (event) => {
    setNewName (event.target.value)
  }

  const handleTelephoneInput = (event) => {
    setNewTelephone (event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const repeatedPersons = persons.filter(person => person.name===newName)

    if(repeatedPersons.length !== 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons( persons.concat( { name : newName, telephone : newTelephone } ) )
    }  
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Name: <input onChange={handleNameInput}/>
          </div>
          <div>
            Telephone: <input onChange={handleTelephoneInput}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        <hr />
        </form>
      </div>
        <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.telephone}</p>)}
      </div>
    </>
  )
}

export default App
