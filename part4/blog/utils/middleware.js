const morgan = require('morgan')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'page not found on the server' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err })
  }

  next(err)
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler
}
