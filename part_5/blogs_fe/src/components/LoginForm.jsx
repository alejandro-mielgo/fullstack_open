import { useState, useEffect } from 'react'
import loginService from '../services/login.js'
import Notification from './Notification.jsx'
import blogService from '../services/blogs.js'
import PropTypes from 'prop-types'

const LoginForm = ({ user, setUser }) => {

  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ message, setMessage] = useState(null)
  const [ messageType, setMessageType] = useState(null)



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const sentUser = await loginService.login({ username, password })
      setUser(sentUser)
      blogService.setToken(sentUser.token)
      console.log(sentUser)
      window.localStorage.setItem(
        'loggedBloggappUser', JSON.stringify(sentUser)
      )

    } catch (exception){
      console.log(exception)
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2500)
    }

  }

  return(
    <>
      <form onSubmit={handleLogin}>
        <h3>Login to app</h3>
        <input type="text" className="form-control" placeholder="Username"  value={username} onChange={({ target }) => {setUserName(target.value)}}></input>
        <input type="password" className="form-control" placeholder="password" value={password} onChange={({ target }) => {setPassword(target.value)}}></input>
        <button type="submit" className="btn btn-primary">login</button>
      </form>
      <Notification message={message} messageType={messageType} type/>
    </>
  )

}

LoginForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}

export default LoginForm