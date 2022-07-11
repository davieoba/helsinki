import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [notif, setNotif] = useState({
    message: '',
    classProp: ''
  })
  const blogRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [notif.message])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      const notifObj = {
        message: 'wrong username or password',
        classProp: 'error'
      }

      setNotif(notifObj)
      setTimeout(() => {
        setNotif({ message: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button>login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notif.message} classProp={notif.classProp} />

      <div>
        {user === null && <h2>log in to app</h2>}
        {user === null && loginForm()}
      </div>

      {user &&
        <div style={{ marginBottom: '20px' }}>
          <span>{user.name} logged in </span>
          <button onClick={() => handleLogout()}>logout</button>
        </div>}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h2>create new blog</h2>

      <Togglable buttonLabel='create new blog' ref={blogRef}>
        <BlogForm toggle={blogRef?.current?.toggleVisibility} />
      </Togglable>
    </div>
  )
}

export default App
