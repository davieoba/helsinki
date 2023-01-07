const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["true", "A book should have a title"],
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: {
    type: [String],
  },
})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book
