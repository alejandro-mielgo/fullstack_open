import axios from 'axios'

const urlBase="http://localhost:3001/persons"

const getContacts = () => {
    const request = axios.get(urlBase)
    return request.then(resonse => resonse.data )
}

const addContact = (newContact) =>{
    const request = axios.post(urlBase, newContact)
    console.log(request)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${urlBase}/${id}`)
    console.log(request)
    return request.then(response => response.data)
}

const updateNumber = (updatedContact) =>{
    try{
        const request = axios.put(`${urlBase}/${updatedContact.id}`,updatedContact)
        return request.then(response => response.status)
    }catch{
        console.log("error")
        return(false)
    }
    
}


export default { getContacts, addContact, deleteContact, updateNumber }