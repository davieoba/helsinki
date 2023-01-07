import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../query'

export const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      return error.graphQLErrors[0].message
    },
  })

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value)
      localStorage.setItem('user-library-auth', result.data.login.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.data])

  const onSubmit = (e) => {
    e.preventDefault()

    login({ variables: { username: username, password: password } })

    setUsername('')
    setPassword('')

    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Login Form</h1>
      <div>
        <label>User name</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
