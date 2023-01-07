import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      genres
      published
    }
  }
`

export const ALL_THE_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      genres
      published
    }
  }
`

// export const ALL_BOOKS = gql`
//   query {
//     allBooks {
//       title
//       author {
//         name
//       }
//       genres
//       published
//     }
//   }
// `

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      born
      name
      bookCount
    }
  }
`

export const RECOMMENDED_BOOKS = gql`
  query {
    favouriteBook {
      title
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      id
      born
      name
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
