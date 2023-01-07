const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "A name is required"],
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

const Author = mongoose.model("Author", authorSchema)
module.exports = Author
