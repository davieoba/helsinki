import './App.css';
import { useEffect, useState } from 'react'
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([])

  // fetch the initial user data
  useEffect(() => {
    axios.get(`http://localhost:3001/persons`).then((res) => {
      // console.log(res.data)

      setPersons(res.data)
    })

  }, [])

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

  // handle the form submit
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


    // clear the input form
    const clearForm = {
      username: '',
      phone: ''
    }
    setNewName(clearForm)

  }


  // filter the names 
  const handleFilter = (e) => {

    const filteredArr = persons.filter((el) => {

      return el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

    })

    setFilter(filteredArr)
  }

  // the logic that handles the names to be rendered 
  const render = filter.length > 0 ? filter : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <h2>Add a new </h2>

      <PersonForm handleSubmit={handleSubmit} userNameValue={newName.username} handleChange={handleChange} userPhoneValue={newName.phone} />

      <h3>Numbers</h3>
      <ul>

        <Persons render={render} />
      </ul>
    </div>
  )
}

export default App