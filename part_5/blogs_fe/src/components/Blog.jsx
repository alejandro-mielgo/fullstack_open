import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, setBlogs, handleLike }) => {

  const ownerLogged = user.username===blog.user.username

  const handleRemove =  (event) => {
    if(window.confirm(`Delete ${blog.title}`)) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogList => blogList.filter(post => post.id !==blog.id))
    }

  }

  return (
    <div className="p-3 mb-5 shadow p-3 mb-5 bg-body rounded blog-item">
      <p>{blog.title}</p> <p>{blog.author}</p>
      <Togglable buttonLabel="View">
        <p>{blog.url}</p>
        <p>likes: {blog.likes}</p>
        <button className="btn btn-primary" onClick={() => handleLike(blog)}>Like</button>
        {ownerLogged ? <button className="btn btn-danger" onClick={handleRemove}>Remove</button>:null }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func,
  handleLike: PropTypes.func,
}

export default Blog