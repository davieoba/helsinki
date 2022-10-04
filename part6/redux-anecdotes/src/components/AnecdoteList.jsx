import { useSelector, useDispatch } from 'react-redux'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import { filterData } from './../reducers/filterReducer'
import { voteAnecdote } from '../reducers/anecdotes'


export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  // const filter = useSelector(state => state.filter)

  const vote = (id, content) => {
    console.log('vote', id)
    // dispatch({
    //   type: 'VOTE_ANECDOTE',
    //   data: {
    //     payload: id
    //   }
    // })
    dispatch(voteAnecdote(id, content))

    dispatch(createNotification(`You voted ${content}`))

    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)

  }

  const handleChange = (e) => {
    // console.log(e.target.value.trim() === '')

    if (e.target.value === '') {
      return dispatch(filterData())
    }
    dispatch(filterData(e.target.value.trim()))

    // console.log(filter)

  }

  const sortedAnecdotes = anecdotes && [...anecdotes]?.sort((a, b) => b.votes - a.votes)
  // console.log(sortedAnecdotes)

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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
