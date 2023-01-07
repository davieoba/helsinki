const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const UserApp = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'TYPE_IN_A_VERY_SECURE_KEY_HERE'

const MONGO_URI =
  'mongodb+srv://bodunrindavid:MTpRTYAOQzkVzZsI@cluster0.og3p1yz.mongodb.net/helsinki_graphql?retryWrites=true&w=majority'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID
  }

  type Token {
    value: String
  }

  # go to Author's query and resolve bookCount
  type Author {
    id: ID!
    born: Int
    name: String
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    users: [User]
    favouriteBook: [Book]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    addAuthor(name: String!, born: Int): Author

    editAuthor(name: String!, born: Int): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args, context) => {
      return await Book.collection.countDocuments()
    },
    authorCount: async (root, args, context) => {
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args, context) => {
      let books = await Book.find().populate('author')

      const author = await Author.findOne({ name: args.author })

      // filter the books that have the author and genre passed from the args
      if (args) {
        if (args.author) {
          books = Book.find({ author: author._id })
        }

        if (args.genre) {
          books = Book.find({ genres: { $in: args.genre } })
        }
      }

      return books
    },
    allAuthors: async (root, args) => {
      return await Author.find()
    },
    me: async (root, args, context) => {
      const req = await context.auth()

      return req.user
    },
    users: async (root, args) => {
      const users = await UserApp.find()

      return users
    },
    favouriteBook: async (root, args, context) => {
      const user = await context.auth()

      if (!user) {
        throw new AuthenticationError('not authenticated')
      }

      const userFavouriteGenre = user.user.favouriteGenre.toLowerCase()

      const books = await Book.find({
        genres: { $in: userFavouriteGenre },
      }).populate('author')
      // console.log(books)

      return books
    },
  },
  Author: {
    bookCount: async (root, args, context) => {
      // let authoredBooks = 0
      // books.forEach((book) => {
      //   if (root.name === book.author) {
      //     authoredBooks = authoredBooks + 1
      //   }
      // })
      // return authoredBooks
      // *****************************************
      // find the authors who have created books and how many books they have written
      // const books = await context.books()
      // console.log(await context.books())
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { user } = await context.auth()

      if (!user) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        // Author.create({ name: args.author })
        if (args.author.length < 4) {
          throw new UserInputError(
            'Author name should be more than 4 characters'
          )
        }

        author = new Author({ name: args.author })
        author.save()
      }

      if (args.title < 2) {
        throw new UserInputError(
          'A book title should have more than 2 characters'
        )
      }
      // create the book with the author params
      const book = await Book.create({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })

      const newBook = await Book.findById(book._id).populate('author')

      return newBook
    },
    addAuthor: async (root, args, context) => {
      const auth = await context.auth()

      if (!auth.user) {
        throw new AuthenticationError('not authenticated')
      }

      if (args.name.length < 4) {
        throw new UserInputError('Author name should be more than 4 characters')
      }

      const author = new Author({ ...args })
      author.save()

      return author
    },
    editAuthor: async (root, args, context) => {
      const auth = await context.auth()

      if (!auth.user) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.name })

      let updatedAuthor = await Author.findByIdAndUpdate(
        author._id,
        { ...args },
        { new: true }
      )

      return updatedAuthor
    },
    createUser: async (root, args, context) => {
      const user = new UserApp({ ...args })
      try {
        user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args, context) => {
      const user = await UserApp.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const token = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(token, JWT_SECRET),
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      books: async () => {
        const books = await Book.find().populate('author')
        return books
      },
      auth: async () => {
        let token
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('bearer')
        ) {
          token = req.headers.authorization.split(' ')[1]
        }

        const decodedToken = jwt.verify(token, JWT_SECRET)

        const user = await UserApp.findById(decodedToken.id)

        return { user }
      },
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

// implement the bookCount feature
// implement the user auth section
