import './App.css';
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState({
    username: '',
    phone: ''
  })

  const [filter, setFilter] = useState('')

  const handleChange = (e) => {
    const userName = e.target.value
    const phonenumber = e.target.value
    setNewName((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const obj = {
      name: newName.username.trim(),
      number: newName.phone.trim()
    }

    const exist = persons.find((el) => el.name === obj.name)

    if (exist) {
      alert(`${obj.name}, is already added to the phone book`);
      return
    }

    if (!obj.number) {
      alert(`you did not include a phone number`)
      return
    }
    setPersons(persons.concat(obj))
  }

  // const globalData = filter 
  // console.log(filter)

  const handleFilter = (e) => {
    // some code
    // 1. get all the users 
    // 2. filtered = filter by the content typed and store in a place 
    // 3. set this value above to persons 
    // console.log(persons)
    console.log(e.target.value)
    const filteredArr = persons.filter((el) => {
      return el.name === e.target.value
    })
    console.log(filteredArr)
    setFilter(filteredArr)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with <input type='text' onChange={handleFilter} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name:</label>
          <input id='name' value={newName.username} onChange={handleChange} name='username' />
        </div>

        <div>
          <label htmlFor="number"> number:</label>
          <input id='number' value={newName.phone} onChange={handleChange} name='phone' />
        </div>

        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((el, i) => {
          return <li key={el.name}> {el.name} {el.number}</li>
        })}
      </ul>
    </div>
  )
}

export default App