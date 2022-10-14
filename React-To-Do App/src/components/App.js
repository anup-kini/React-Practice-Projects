import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyForm from './MyForm'
import Navbar from './Navbar'
import UserList from './UserList'


const App = () => {
  return (
    <>
       <Navbar/>
       <Routes>
            <Route path='/' element={<MyForm/>}/>
            <Route path='/userList' element={<UserList/>}/>
       </Routes>
    </>
  )
}

export default App