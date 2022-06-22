const config = require('./utils/config')
const express = require('express')

const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogController')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to DB')
}).catch((err) => {
  logger.error('error connecting to the DB', err.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.morgan('dev'))
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
