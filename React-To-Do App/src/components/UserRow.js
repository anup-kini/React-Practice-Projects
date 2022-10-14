import axios from 'axios'
import React from 'react'

const UserRow = ({user}) => {

 const deleteHandler = () => {
     axios.delete(`http://localhost:3000/users/${user.id}`)
          .then(response => {
              if(response.status === 200){
                  alert('User Deleted Successfully !!!')
              }
          })
 }
  
  return (
    <>
    <li>
       {user.email}
    </li>
    <div><button onClick={deleteHandler} className='btn btn-danger btn-sm'>Delete</button></div>
    </>
  )
}

export default UserRow