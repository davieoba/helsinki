const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button style={{ marginLeft: '100px' }}> view </button>
      </div>
    </div>
  )
}

export default Blog