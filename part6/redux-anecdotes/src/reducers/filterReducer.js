import { createSlice, current } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = {
  data: anecdotesAtStart.map(asObject),
  filter: []
}

// console.log(initialState)

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterData: (state, action) => {
      console.log(current(state))
      const filterState = [...state.data]
      const filteredState = filterState.filter((el) => {
        return el.content.includes(action.payload)
      })

      // console.log(filteredState)


      // console.log(current(state))
      return {
        ...state,
        filter: [...filteredState]
      }

      // return [
      //   ...filteredState
      // ]
    }
  }
})

export const { filterData } = filterSlice.actions
export default filterSlice.reducer

