import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  const [visibility, setVisibility] = useState(false)

  function toggle() {
    setVisibility(prev => !prev)
  }

  const hide = { display: visibility ? 'block' : 'none' }

  const [likes, setLikes] = useState(blog.likes)
  const handleClick = async () => {
    // @todo:  when clicked increment the current value of like
    setLikes(prev => prev + 1)
  }

  useEffect(() => {
    const blogData = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.updateLikes(blog.id, blogData).then(() => {
      // console.log(data)
    })
  }, [likes, blog.url, blog.author, blog.title, blog.id, blog.user.id])

  const handleDelete = () => {
    const userToken = JSON.parse(localStorage.getItem('loggedInUser')).token

    blogService.setToken(blog.user)
    const res = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (res === false) return

    blogService.deleteBlog(blog.id, userToken)
  }

  function renderDelete() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))?.user?.id
    const blogUser = blog.user.id

    return user === blogUser ? <button onClick={handleDelete}> delete </button> : ''
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button style={{ marginLeft: '100px' }} onClick={toggle}> view </button>
      </div>

      <div style={hide}>
        <div>
          {blog.url}
        </div>

        <div>
          {likes} <button onClick={handleClick}>like</button>
        </div>

        <div>
          {blog.user.name}
        </div>

        {renderDelete()}
      </div>
    </div>
  )
}

export default Blog