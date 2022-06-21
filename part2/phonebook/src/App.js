import './index.css';
import { useEffect, useState } from 'react'
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import phoneService from './services/phoneService'
import { Notification } from './components/Notification';

// https://phone-backend-davidbond.herokuapp.com/api/persons
const App = () => {

  const [persons, setPersons] = useState([])
  // notification message
  const [notif, setNotif] = useState({
    message: '',
    classProp: ''
  })

  // fetch the initial user data
  useEffect(() => {
    phoneService.getAll().then((res) => {

      setPersons(res)
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

    // controlled input for the form 
    const obj = {
      name: newName.username.trim(),
      number: newName.phone.trim()
    }

    if (!obj.number) {
      alert(`you did not include a phone number`)
      return
    }

    const exist = persons.find((el) => el.name === obj.name)

    if (exist) {
      window.confirm(`${exist.name}, is already added to the phone book replace the old number with a new one?`);
      // if the user selects true then the data is updated and the function returns 

      // update the user data
      // get the user id 
      const id = exist.id

      // update the phone number
      const updateNumber = { ...exist, number: obj.number }
      phoneService.update(id, updateNumber).then((res) => {
        // set the state and note that the res contains the updated property only
        const data = persons.map((el) => {
          if (el.id === id) {
            return res
          } else {
            return el
          }
        })

        setPersons(data)
        // send notification
        const notifObj = {
          message: `Updated ${exist.name}`,
          classProp: 'success'
        }
        setNotif(notifObj)

        setTimeout(() => {
          setNotif({ message: null })
        }, 5000)
      }).catch((err) => {
        const notifObj = {
          // message: `Information of ${obj.name} has already been removed from the server`,
          message: err.message,
          classProp: 'error'
        }
        setNotif(notifObj)
        setTimeout(() => {
          setNotif({ message: null })
        }, 5000)
        // alert(`the phone was already deleted from the server`)

        // sendNotification
        const removeUser = persons.filter((el) => {
          return el.id !== id
        })

        setPersons(removeUser)
      })

      // clear the form
      const clearForm = {
        username: '',
        phone: ''
      }
      setNewName(clearForm)
      return
    }

    // create a new person contact in the db 
    phoneService.create(obj).then((res) => {
      const notifObj = {
        message: `Added ${res.name}`,
        classProp: 'success'
      }
      setNotif(notifObj)
      setTimeout(() => {
        setNotif({ message: null })
      }, 5000)
      setPersons(persons.concat(res))
    }).catch(err => {
      // console.log(err)
      const notifObj = {
        message: `${err.response.data.error}`,
        classProp: 'error'
      }

      setNotif(notifObj)
      setTimeout(() => {
        setNotif({ message: null })
      }, 5000)
    })

    // clear the input form
    const clearForm = {
      username: '',
      phone: ''
    }
    setNewName(clearForm)
    return
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

  // handleDelete
  function handleDelete(id) {
    console.log(id)
    // get the user through the id
    const user = persons.find((el) => {
      return el.id === id
    })

    // alert user of action
    window.confirm(`Delete ${user.name} ?`)

    // delete the user data from the "api"
    phoneService.deleteData(id)
    // update the phone number list
    const updatedUser = persons.filter((el) => {
      return el.id !== id
    })

    // update the users 
    setPersons(updatedUser)
  }

  return (
    <div>
      <h2 className='title'>Phonebook</h2>

      < Notification classProp={notif.classProp} message={notif.message} />

      <div className='main'>

        <div className='section_1'>
          <Filter handleFilter={handleFilter} />

          <h2 className='header_add'>Add a new </h2>

          <PersonForm handleSubmit={handleSubmit} userNameValue={newName.username} handleChange={handleChange} userPhoneValue={newName.phone} />
        </div>

        <div className='section_2'>
          <h3>Numbers</h3>

          <Persons render={render} handleDelete={handleDelete} />
        </div>

      </div>

    </div>
  )
}

export default App