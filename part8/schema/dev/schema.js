const { gql } = require('apollo-server')

// so when a new person is added all of its details are sent to the all subscribers
const typeDefs = gql`
  type Subscription {
    personAdded: Person!
  }
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    getUsers: [User]
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    deletePerson(id: ID!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
`

module.exports = typeDefs
