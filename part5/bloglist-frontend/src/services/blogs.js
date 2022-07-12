import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

console.log(token)
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)

  return res.data
}

const updateLikes = async (blogId, blogObj) => {
  const res = await axios.put(`${baseUrl}/${blogId}`, blogObj)

  return res.data
}

const deleteBlog = async (blogId, token) => {
  console.log(token)
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, createBlog, setToken, updateLikes, deleteBlog }