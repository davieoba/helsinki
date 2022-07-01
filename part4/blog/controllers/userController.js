const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (req, res) => {
  const users = await User.find().populate('blog', {
    url: 1, title: 1, author: 1, _id: 1
  })

  res
    .status(200)
    .json({ message: 'success', data: users })
})

userRouter.post('/', async (req, res) => {
  if (req.body.password.length < 3) {
    res.status(400).json({ message: 'password is too short' })
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10)

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password: hashPassword
  })

  await user.save()

  res.status(201).json({
    message: 'success',
    data: {
      user
    }
  })
})

module.exports = userRouter
