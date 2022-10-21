/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"
import { anecdoteService } from './../services/anecdotes.js'
import { appendAnecdote, createAnecdote } from './../reducers/anecdotes.js'

import { connect } from 'react-redux'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const AnecdoteForm = (props) => {
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

    props.createAnecdote(anecdoteData)

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

const mapDispatchToProps = {
  createAnecdote: createAnecdote
}

const ConnetedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnetedAnecdoteForm
