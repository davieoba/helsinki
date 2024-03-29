import { useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

// hooks
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        anecdotes
      </Link>
      <Link to='/create' style={padding}>
        create new
      </Link>
      <Link to='/about' style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => {
  const styles = {
    border: '2px solid tomato',
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <p style={{ styles }}>{notification}</p>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <h3>{anecdote.author}</h3>
      <p>has {anecdote.votes} votes</p>
      <article>
        <span>for more info see </span>
        <a href={anecdote.info} target='_blank' rel='noreferrer'>
          info
        </a>
      </article>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  // each of them have their separate state they are not sharing the same state even though they have the same hook
  // add new code
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    // content.clearvalue()
    // author.clearvalue()
    // info.clearvalue()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
            {...content}
          />
        </div>
        <div>
          author
          <input
            name='author'
            // value={author}
            // onChange={(e) => setAuthor(e.target.value)}
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            name='info'
            // value={info}
            // onChange={(e) => setInfo(e.target.value)}
            {...info}
          />
        </div>
        <button>create</button> <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    // set the notification over here
    setNotification(`a new acecdote ${anecdote.content} created!`)

    setTimeout(() => {
      setNotification('')
    }, 5000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   }

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  // }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => {
        return anecdote.id === Number(match.params.id)
      })
    : null

  return (
    <>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route
            path='anecdotes/:id'
            element={<Anecdote anecdote={anecdote} />}
          />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route
            path='/'
            element={
              <AnecdoteList anecdotes={anecdotes} notification={notification} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
