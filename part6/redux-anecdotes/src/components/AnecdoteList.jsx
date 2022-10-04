import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { filterData } from './../reducers/filterReducer'
import { voteAnecdote } from '../reducers/anecdotes'


export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  // const filter = useSelector(state => state.filter)

  const vote = (id, content, votes) => {

    dispatch(voteAnecdote(id, content, votes))

    // dispatch(createNotification(`You voted ${content}`))

    // setTimeout(() => {
    //   dispatch(removeNotification(''))
    // }, 5000)

    dispatch(setNotification({ message: `You voted ${content}`, time: 10 }))

  }

  const handleChange = (e) => {

    if (e.target.value === '') {
      return dispatch(filterData())
    }
    dispatch(filterData(e.target.value.trim()))

  }

  const sortedAnecdotes = anecdotes && [...anecdotes]?.sort((a, b) => b.votes - a.votes)

  return (
    <>
      <input type="text" name="filter" id="filter" onChange={handleChange} />
      {anecdotes?.length > 1 && sortedAnecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
