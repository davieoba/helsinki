import { useQuery } from "@apollo/client"
import { RECOMMENDED_BOOKS } from "../query"

export const Recommend = ({ show }) => {
  const result = useQuery(RECOMMENDED_BOOKS)

  if (show === false) {
    return null
  }

  if (result.loading) {
    return <p>Loading...</p>
  }

  console.log(result.data.favouriteBook)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {result.data.favouriteBook.map((a, i) => {
            return <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          })}
        </tbody>
      </table>

    </div>
  )
}

//<p key={i}>{a.title}</p>