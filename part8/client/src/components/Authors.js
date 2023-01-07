import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../query"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [bornTo, setBornTo] = useState("")

  const notify = props.notify

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    },
  })

  if (!props.show) {
    return null
  }

  if (props.data.loading) {
    return <p>Loading...</p>
  }

  const authors = props.data.data.allAuthors

  const onSubmit = (e) => {
    e.preventDefault()

    console.log({ bornTo, name: name })

    editAuthor({ variables: { name: name, born: bornTo } })

    setName("")
    setBornTo("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section>
        <h2> Set birthyear</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>name</label>
            <select onChange={(e) => setName(e.target.value)}>
              <option defaultValue disabled hidden>
                Select an author
              </option>
              {authors.map((el) => {
                return (
                  <option key={el.name} value={el.name}>
                    {el.name}
                  </option>
                )
              })}
            </select>
          </div>
          {/* <div>
            <label>name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}

          <div>
            <label>born</label>
            <input
              type="number"
              value={bornTo}
              onChange={(e) => setBornTo(parseInt(e.target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </section>
    </div>
  )
}

export default Authors
