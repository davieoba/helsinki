import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'

const Books = (props) => {
  const [bookToSearch, setBookToSearch] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: bookToSearch },
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
  })

  // console.log(result)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>Loading ...</p>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a, i) => (
            <tr key={a.title}>
              <td>{i + 1}</td>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        value='refactoring'
        onClick={(e) => setBookToSearch(e.target.value)}
      >
        refactoring
      </button>
      <button value='agile' onClick={(e) => setBookToSearch(e.target.value)}>
        agile
      </button>
      <button value='patterns' onClick={(e) => setBookToSearch(e.target.value)}>
        patterns
      </button>
      <button value='design' onClick={(e) => setBookToSearch(e.target.value)}>
        design
      </button>
      <button value='crime' onClick={(e) => setBookToSearch(e.target.value)}>
        crime
      </button>
      <button value='classic' onClick={(e) => setBookToSearch(e.target.value)}>
        classic
      </button>
      <button value='allgenres' onClick={(e) => setBookToSearch('')}>
        all genres
      </button>
    </div>
  )
}

export default Books
