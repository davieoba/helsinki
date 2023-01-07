/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../query'

const NewBook = (props) => {
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(JSON.stringify(error))
      alert(error)
    },
    refetchQueries: [{ query: ALL_BOOKS }],
    // update: (cache, response) => {
    //   console.log(response)
    //   cache.updateQuery({ query: ALL_THE_BOOKS }, (allBooks) => {
    //     console.log({ allBooks })

    //     return {
    //       allBooks: allBooks.concat(response.data.addBook),
    //     }
    //   })
    // },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
