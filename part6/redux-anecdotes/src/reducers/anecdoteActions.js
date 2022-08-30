import { getId } from "./anecdoteReducer"

export const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}