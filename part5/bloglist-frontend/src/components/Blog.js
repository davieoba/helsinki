import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  console.log(blog)
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
    // @note: update the blogData to be sent to the DB
    // const blogData = {
    //   user: blog.user.id,
    //   likes: likes,
    //   author: blog.author,
    //   title: blog.title,
    //   url: blog.url
    // }

    // await blogService.updateLikes(blog.id, blogData)
  }

  useEffect(() => {
    const blogData = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.updateLikes(blog.id, blogData).then((data) => {
      console.log(data)
    })
  }, [likes, blog.url, blog.author, blog.title, blog.id, blog.user.id])

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
      </div>
    </div>
  )
}

export default Blog