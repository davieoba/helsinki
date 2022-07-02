import { useState } from "react"

export const BlogForm = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
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
      <button>create</button>
    </form>
  )
}