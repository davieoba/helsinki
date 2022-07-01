const morgan = require('morgan')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'page not found on the server' })
}

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err })
  } else if (err.name === 'MongoServerError') {
    res.status(400).json({ message: 'username must be unique' })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: 'token expired'
    })
  }

  logger.error(err.message)

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  req.user = user

  next()
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
