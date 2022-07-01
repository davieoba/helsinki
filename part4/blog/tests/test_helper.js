const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove this soon',
    author: 'will remove',
    url: 'www.remove.com',
    likes: 0
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  // return blogs.map((blog) => blog.toJSON())
  return blogs
}

const usersInDb = async () => {
  const users = await User.find()

  return users
}

module.exports = {
  initialBlog,
  nonExistingId,
  blogsInDb,
  usersInDb
}
