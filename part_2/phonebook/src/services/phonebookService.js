import axios from 'axios'

const urlBase="http://localhost:3001/persons"

const getContacts = () => {
    const request = axios.get(urlBase)
    return request.then(resonse => resonse.data )
}

const addContact = (newContact) =>{
    const request = axios.post(urlBase, newContact)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${urlBase}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (updatedContact) =>{
    const request = axios.put(`${urlBase}/${updatedContact.id}`,updatedContact)
    return request.then(response => response.data)
}


export default { getContacts, addContact, deleteContact, updateNumber }