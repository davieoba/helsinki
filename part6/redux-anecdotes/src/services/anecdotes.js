import axios from 'axios'

const baseUrl = `http://localhost:3001/anecdotes`

const getAll = async () => {
  const response = await axios(baseUrl)
  return response.data
}

const create = async (data) => {
  const response = await axios.post(baseUrl, data)

  console.log(response.data)
  return response.data
}

const vote = async (id, anecdoteObj) => {
  const obj = await axios.get(`${baseUrl}/${id}`)
  const updateObj = obj.data.votes
  const addVote = updateObj + 1
  console.log(updateObj, addVote)

  const response = await axios.put(`${baseUrl}/${id}`, { vote: addVote })

  // return response.data
}

/**
 * const updateLikes = async (blogId, blogObj) => {
  const res = await axios.put(`${baseUrl}/${blogId}`, blogObj)

  return res.data
}
 */

export const anecdoteService = { getAll, create, vote }