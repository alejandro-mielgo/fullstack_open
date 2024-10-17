import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInput = (event) => {
    setNewName (event.target.value)

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const repeatedPersons = persons.filter(person => person.name===newName)
    if(repeatedPersons.length !== 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name:newName}))
    }  
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleInput}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        <hr />
        </form>
      </div>
        <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </>
  )
}

export default App
