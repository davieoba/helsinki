/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit'
import { anecdoteService } from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdote: (state, action) => {
      return state = action.payload
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    updateVote: (state, action) => {
      console.log(action.payload)
      state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return anecdote.votes++
        }
      })
    }
  }
})

export const { setAnecdote, appendAnecdote, updateVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id, content, votes) => {
  return async (dispatch) => {
    // console.log(id, content, votes)
    const anecdoteData = {
      id: id,
      content: content,
      votes: votes + 1
    }
    const anecdote = await anecdoteService.vote(id, anecdoteData)

    console.log('reducer:', anecdote)

    dispatch(updateVote(id))
  }
}

export default anecdoteSlice.reducer

