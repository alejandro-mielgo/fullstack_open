import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification.jsx'
import PropTypes from 'prop-types'


const SubmitForm = ({ setBlogs, blogFormRef, handleSubmit }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const newBlog = {
    title: title,
    author: author,
    url: url
  }

  return(
    <>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(newBlog)
      }}>
        <h3>Create new blog entry</h3>
        <input type="text" className="form-control" placeholder="title"value={title} onChange={({ target }) => {setTitle(target.value)}}></input>
        <input type="text" className="form-control" placeholder="author"value={author} onChange={({ target }) => {setAuthor(target.value)}}></input>
        <input type="text" className="form-control" placeholder="url"value={url} onChange={({ target }) => {setUrl(target.value)}}></input>
        <button className="btn btn-primary">create</button>
      </form>
    </>
  )
}

SubmitForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default SubmitForm