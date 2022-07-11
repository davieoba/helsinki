const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 400
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

export default Blog