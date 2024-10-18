import { useState, useEffect } from 'react'
import axios from 'axios'
 
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'

const App = () => {

  //estados
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
 
  //hook conseguir datos del servidor
  const hook = () =>{
    phonebookService
      .getContacts()
      .then( contacts => {
        setPersons(contacts)
      })
  }
  useEffect(hook,[persons])

  //Controladores
  const handleFilter = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm) //este va con retrasito
  }
  
  const handleNameInput = (event) => {
    setNewName (event.target.value)
  }

  const handleTelephoneInput = (event) => {
    setNewNumber (event.target.value)
  }

  const handleSubmit = (event) => {

    event.preventDefault()
    const  newPerson = { name : newName, number : newNumber }

    if(persons.some(person => person.name===newName)) {
      //recuperar contacto de la lista para conseguir el id existente
      const updatedContact = persons.filter(person => person.name===newName)[0] //devuelve un array, me quedo con el primero
      updatedContact.number = newNumber
      console.log(updatedContact)
      
      if(window.confirm(`${newName} is already added to phonebook, replace old nuber with a new one?`)) {
        phonebookService
          .updateNumber(updatedContact)
          .then(updatedNumber=>console.log(updatedNumber))
      }
      
    } else {

      phonebookService
        .addContact(newPerson)
        .then(response => setPersons(persons.concat(response)))
    }
  }

  const handleDeleteContact = (id, name) => {

    if(window.confirm(`Do you want to remove ${name} from the agenda`)){
      phonebookService
        .deleteContact(id)
        .then(contactoEliminado => {
        console.log("eliminado",contactoEliminado)
      })
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
        <Persons 
          persons = {persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          deleteContact = {handleDeleteContact}
        />
      </div>
    </>
  )
}

export default App
