const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const data = await Blog.find()
  res.status(200).json(data)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const data = await blog.save()
  res.status(201).json(data)
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const newBody = { ...req.body }
  const blogs = await Blog.findByIdAndUpdate(id, newBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    data: blogs,
    message: 'successfully updated'
  })
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndRemove(id)

  res.status(204).json({ message: 'deleted successfully' })
})

module.exports = blogRouter
