const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find().then((data) => res.json(data))
})

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((data) => res.status(201).json(data))
})

module.exports = blogRouter
