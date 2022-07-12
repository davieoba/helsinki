// import { useState } from 'react'
// import loginService from './../services/login'
// import blogService from './../services/blogs'

// export const LoginForm = () => {
//   const [user, setUser] = useState(null)
//   const [password, setPassword] = useState('')
//   const [username, setUsername] = useState('')
//   const [notif, setNotif] = useState({
//     message: '',
//     classProp: ''
//   })
//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {
//       const user = await loginService.login({
//         username,
//         password
//       })

//       window.localStorage.setItem('loggedInUser', JSON.stringify(user))

//       blogService.setToken(user.token)
//       setUser(user)
//       setUsername('')
//       setPassword('')
//     } catch (err) {
//       const notifObj = {
//         message: 'wrong username or password',
//         classProp: 'error'
//       }

//       setNotif(notifObj)
//       setTimeout(() => {
//         setNotif({ message: null })
//       }, 5000)
//     }
//   }
//   return (
//     <form onSubmit={handleLogin}>
//       <div>
//         <label htmlFor="username">username</label>
//         <input
//           type="text"
//           name='username'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="password">password</label>
//         <input
//           type="password"
//           name='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button style={{ width: '100px' }} className='button'>login</button>
//     </form>
//   )
// }