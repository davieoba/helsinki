import { useState } from 'react'

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
          {blog.likes}
        </div>

        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog