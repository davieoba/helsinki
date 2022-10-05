import axios from 'axios'

const baseUrl = `http://localhost:3001/anecdotes`

const getAll = async () => {
  const response = await axios.get(baseUrl)

  console.log(response)
  return response.data
}

const create = async (data) => {
  const response = await axios.post(baseUrl, data)

  console.log(response.data)
  return response.data
}

const vote = async (id, anecdoteData) => {

  const response = await axios.put(`${baseUrl}/${id}`, anecdoteData)

  return response.data
}

export const anecdoteService = { getAll, create, vote } 