import { useState } from "react"
import blogService from "../services/blogs"


export const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // const [notif, setNotif] = useState({
  //   message: '',
  //   classProp: ''
  // })


  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      await blogService.createBlog({
        title,
        author,
        url
      })

      // const notifObj = {
      //   message: `a new blog ${blog.title} by ${blog.author} added`,
      //   classProp: 'success'
      // }

      // setNotif(notifObj)
      // setTimeout(() => {
      //   setNotif({ message: null })
      // }, 5000)

      props?.toggle?.()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      // const notifObj = {
      //   message: 'error creating blog',
      //   classProp: 'error'
      // }
      // setNotif(notifObj)
      // setTimeout(() => {
      //   setNotif({ message: null })
      // }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={author}
            name='author'
            onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={url}
            name='url'
            onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button style={{ marginTop: '20px' }}>create new</button>
      </form>
    </>
  )
}