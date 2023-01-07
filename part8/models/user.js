const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
})

const UserApp = mongoose.model("UserApp", userSchema)

module.exports = UserApp
