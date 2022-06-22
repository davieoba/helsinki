require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGO_URI = process.env.MONGO_URI


module.exports = {
    PORT,
    MONGODB_URI,
    MONGO_URI
}