const { UserInputError, AuthenticationError } = require('apollo-server')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// const Person = require("./models/person")
// const User = require("./models/userDev")

const Person = require('./../../models/person')
const User = require('../../models/userDev')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'TYPE_IN_A_VERY_SECURE_KEY_HERE'

const resolvers = {
  Query: {
    personCount: async () => await Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' } })
    },
    findPerson: async (root, args) => {
      const person = Person.findOne({ name: args.name })
      return person
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
    getUsers: async (root, args, context) => {
      const users = await User.find()

      return users
    },
  },
  Person: {
    name: (root) => root.name,
    phone: (root) => root.phone,
    id: (root) => root.id,
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
  User: {
    friends: async (root, args, context) => {
      // 1. get the friends from the user
      // the friends are stored in the user
      // get the current user
      console.log(context.currentUser)
      const friends = context.currentUser.friends

      return friends
    },
  },
  Mutation: {
    // this is the resolver for the subscription personAdded
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      // when I add a person the person is added to the friend list of the current logged in user

      // so this code section really does like 2 things, 1. Create a new person and also add that person to the friends list of the currently logged in user

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      // this is the only code that was added for the subscription
      pubsub.publish('PERSON_ADDED', { personAdded: person })

      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      return person
    },
    deletePerson: (root, args) => {
      const person = persons.findIndex((p) => p.id === args.id)

      console.log(person)

      persons.splice(person, 1)

      return persons
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ email: args.email })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userToken, JWT_SECRET),
      }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      // check if the person is authenticated
      // check if the person is not in the friends list already
      // if the person is not in the friends list then add the person
      // return the current user
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const person = await Person.findOne({ name: args.name })

      const filterFriendList = currentUser.friends.filter((el) => {
        if (el._id.toString() === person._id.toString()) {
          return el
        }
      })

      // console.log({ currentUser })

      console.log({ filterFriendList })

      // mike is not added to the friends list of sage

      if (filterFriendList.length > 0) {
        return currentUser
      }

      currentUser.friends = currentUser.friends.concat(person)

      await currentUser.save()

      return currentUser
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
    },
  },
}

// The iterator name is an arbitrary string, now the name follows the convention, it is the subscription name written in capital letters.

module.exports = resolvers
