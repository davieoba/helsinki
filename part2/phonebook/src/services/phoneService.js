import axios from 'axios'
// const fullUrl = `http://localhost:3001/api/persons`
const baseUrl = `/api/persons`
// const heroku = `https://phone-backend-davidbond.herokuapp.com/api/persons`

// get all the user
const getAll = () => {
    // const request = axios.get(heroku)
    const request = axios.get(baseUrl)

    return request.then((res) => res.data)
}

// create a new user
const create = (obj) => {
    const request = axios.post(baseUrl, obj)

    return request.then((res) => res.data)
}

// update a user with the user's unique id
const update = (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj)

    return request.then((res) => res.data)
}

// delete a user with the user's unique id
const deleteData = (id) => {
    axios.delete(`${baseUrl}/${id}`)

    return
}
export default { getAll, create, update, deleteData }