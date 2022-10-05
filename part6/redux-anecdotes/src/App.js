/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import Notification from './components/Notification'
import { anecdoteService } from './services/anecdotes'
import { setAnecdote, initializeAnecdotes } from './reducers/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {

    anecdoteService.getAll().then((data) => {
      dispatch(initializeAnecdotes())
      // dispatch(setAnecdote(data))
    })


  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App