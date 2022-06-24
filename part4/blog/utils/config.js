require('dotenv').config()

const { PORT } = process.env
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const { MONGO_URI } = process.env

module.exports = {
  PORT,
  MONGODB_URI,
  MONGO_URI
}
