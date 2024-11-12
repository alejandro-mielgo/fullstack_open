import axios from 'axios'


const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll =  async () => {
  const response =  await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const blogToUpdate = response.data
}

const like = async (id) => {
  console.log(id)
  let blogToUpdate=null
  try{
    const response = await axios.get(`${baseUrl}/${id}`)
    blogToUpdate = response.data
  } catch(error){
    console.log(error)
    return null
  }
  if (blogToUpdate) {
    console.log('before', blogToUpdate.likes)
    blogToUpdate.likes +=1
    console.log('after', blogToUpdate.likes)

    const request = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
    return request => request.data
  }
}

const deleteBlog = async (id) => {
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, create, setToken, like, deleteBlog }