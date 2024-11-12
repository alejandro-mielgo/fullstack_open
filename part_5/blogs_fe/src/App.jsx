import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/LoginForm'
import SubmitForm from './components/SubmitForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const blogFormRef = useRef()
  const [counter, setCounter ] = useState(0)
  const [message, setMessage ] = useState(null)
  const [messageType, setMessageType ] = useState(null)


  useEffect(() => {  //get all blogs when loading the page
    console.log('getting blogs from server')
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => -a.likes+b.likes) )
    )
  }, [counter])

  useEffect(() => { //check if user has token in local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBloggappUser')
    if (loggedUserJSON) {
      const recoveredUser = JSON.parse(loggedUserJSON)
      console.log('recovered user', recoveredUser)
      setUser(recoveredUser)
      blogService.setToken(recoveredUser.token)
    }
  }, [])


  const handleLogut =(event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBloggappUser')
  }

  const likeBlog = async (blog) => {
    await blogService.like(blog.id)
    console.log('handle like')
    setCounter(counter => counter+1)

  }

  const submitBlog =  (blogObject) => {
    console.log(blogObject)
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage('Entry added')
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 2500)
        })
    } catch(exception){
      console.log(exception)
    }

  }


  if (user===null) {
    return(
      <div className="container">
        <h1 className="my-4">Blogs App</h1>
        <LoginForm setUser={setUser} user={user}/>
      </div>

    )
  } else {

    return (
      <div className="container">
        <h1 className="my-4">Blogs App</h1>

        <p>{`Loged as: ${user.name}`}</p>
        <button className="btn btn-danger" onClick={handleLogut}>logut</button>
        <Togglable buttonLabel="Add entry" ref={blogFormRef}>
          <SubmitForm setBlogs={setBlogs} blogFormRef={blogFormRef} handleSubmit={submitBlog} />
          <Notification message={message} messageType={messageType}/>
        </Togglable>
        <h3>Blog list</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} handleLike={likeBlog} />
        )}
      </div>
    )
  }
}

export default App