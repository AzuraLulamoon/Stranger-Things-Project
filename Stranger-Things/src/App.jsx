import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import NewAccount from './components/NewAccount'
import Profile from './components/Profile'
import SinglePost from './components/SinglePost'

export default function App() {

  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/NewAccount' element={<NewAccount />} />
          <Route path='/:id' element={<SinglePost />} />
        </Routes>
        </div>
        </>
  )
}
