const mongoose = require("mongoose")
const fs = require("fs")
const Author = require("../models/author")
const Person = require("../models/person")
const Book = require("../models/book")

const author = fs.readFileSync("./authorData.json", "utf-8").toString()
const authorObj = JSON.parse(author)

const book = fs.readFileSync("./bookData.json", "utf-8").toString()
const bookObj = JSON.parse(book)

const MONGO_URI =
  "mongodb+srv://bodunrindavid:MTpRTYAOQzkVzZsI@cluster0.og3p1yz.mongodb.net/helsinki_graphql?retryWrites=true&w=majority"

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const createPerson = async () => {
  const person = await Person.create({
    _id: "639c3745e830a782620b5455",
    name: "Mike",
    phone: "08104648031",
    street: "2, Akin Aduwo street Navy Estate, Abuja",
    city: "Abuja",
  })

  await person.save()

  process.exit(1)
}

const createAuthors = async () => {
  const author = await Author.create(authorObj)

  console.log(`author data imported successfully`)

  process.exit(1)
}

const createBooks = async () => {
  const allBooks = await Book.create(bookObj)

  console.log(`book data imported successfully`)

  process.exit(1)
}

// const createAuth = async () => {
//   console.log(authors)

//   process.exit()
// }

// consol()

// createPerson()
// createAuthors()
createBooks()
