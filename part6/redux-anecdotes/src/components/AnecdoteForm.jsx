/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"
import { anecdoteService } from './../services/anecdotes.js'
import { appendAnecdote, createAnecdote } from './../reducers/anecdotes.js'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const anecdoteValue = e.target.anecdote.value

    e.target.anecdote.value = ''

    const anecdoteData = {
      content: anecdoteValue.trim(),
      // id: getId(),
      votes: 0
    }

    dispatch(createAnecdote(anecdoteData))

  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}
