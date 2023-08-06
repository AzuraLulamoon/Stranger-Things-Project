import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import NewAccount from './components/NewAccount'
import Profile from './components/Profile'
import { useState } from 'react'
import NewPost from './components/NewPost'
import SendMessage from './components/SendMessage'

export default function App() {
  const [token, setToken] = useState(null);

  console.log('Token', token)
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/NewAccount' element={<NewAccount />} />
          <Route path='/NewPost' element={<NewPost />} />
          <Route path='/SendMessage/:postID' element={<SendMessage />} />
        </Routes>
        </div>
        </>
  )
}
