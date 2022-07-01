const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const data = await Blog.find().populate('user', { username: 1, name: 1, _id: 1 })
  res.status(200).json(data)
})

blogRouter.get('/:id', async (req, res) => {
  const data = await Blog.findById(req.params.id)
  if (data) {
    res.status(200).json(data)
  }
  res.status(404).end()
})

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ message: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    likes: req.body.likes,
    url: req.body.url,
    user: user._id
  })
  const data = await blog.save()
  user.blog = user.blog.concat(data._id)
  await user.save()
  return res.status(201).json(data)
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const newBody = { likes: req.body.likes }
  const blogs = await Blog.findByIdAndUpdate(id, newBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    data: blogs,
    message: 'successfully updated'
  })
})

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ message: 'token missing or invalid' })
  }
  const currentlyLoggedInUser = decodedToken.id
  const { id } = req.params
  // find the user id on the blog as well
  const blog = await Blog.findById(id)

  const userId = blog.user._id
  console.log(req.user)
  if (currentlyLoggedInUser.toString() !== userId.toString()) {
    return res.status(401).json({ message: 'you do not have permission to delete this blog' })
  }
  await Blog.findByIdAndRemove(id)
  res.status(204).json({ message: 'deleted successfully' })
  return res.end()
})

module.exports = blogRouter
