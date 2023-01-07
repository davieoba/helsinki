import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { LoginForm } from './components/LoginForm'

import { gql, useApolloClient, useQuery } from '@apollo/client'
import { Recommend } from './components/Recommend'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      born
      name
      bookCount
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authorResult = useQuery(ALL_AUTHORS)

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // the user has to be logged in to update authors or to be able to create new books
  // if (!token) {
  //   return <LoginForm setToken={setToken} />
  // }

  // implement the logout feature
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => logout()}>logout</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommended</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} data={authorResult} notify={notify} />
      <Books show={page === 'books'} notify={notify} />

      <Recommend show={page === 'recommend'} />

      <NewBook show={page === 'add'} notify={notify} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div>{errorMessage}</div>
}
