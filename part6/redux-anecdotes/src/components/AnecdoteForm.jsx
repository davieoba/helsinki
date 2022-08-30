import { useDispatch } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()

    const anecdoteValue = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(createAnecdote(anecdoteValue))

    // console.log(anecdotes)
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
