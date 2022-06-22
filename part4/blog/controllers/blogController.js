const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res, next) => {
    Blog.find().then((data) => {
        return res.json(data)
    })
})

blogRouter.post('/', (req, res, next) => {

    const blog = new Blog(req.body)

    blog.save().then((data) => {
        return res.status(201).json(data)
    })
})

module.exports = blogRouter

