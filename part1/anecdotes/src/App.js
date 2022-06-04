import './App.css';
import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const [voting, setVoting] = useState([
    0, 0, 0, 0, 0, 0, 0
  ])

  // get a random quote
  const randomAnecdote = () => {
    const anec = Math.floor(Math.random() * anecdotes.length)

    setSelected(anec)
  }

  // handle the votes 
  const handleVotes = () => {
    const copy = [...voting]

    copy[selected] = copy[selected] + 1
    setVoting(copy)
  }


  // get the position of the most viewed anecdote
  const mostVoted = Math.max(...voting)
  const pos = voting.indexOf(mostVoted)

  function render() {
    if (mostVoted === 0) {
      return <> no votes yet</>
    } else if (mostVoted > 0) {
      return (
        <>
          <p>{anecdotes[pos]}</p>
          <p> has {mostVoted} votes</p>
        </>
      )
    }
  }

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>

      <div>
        {anecdotes[selected]}
      </div>

      <p> has {voting[selected]} votes</p>
      <Button text='vote' handleClick={handleVotes} /><Button text='next anecdote' handleClick={randomAnecdote} />

      <h2>Anecdote with most votes</h2>
      {render()}
    </div>
  );
}

export default App;
