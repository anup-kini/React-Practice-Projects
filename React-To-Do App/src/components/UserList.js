import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserRow from './UserRow';
const UserList = () => {
  
  let [users, setUsers] = useState([]);
  
  useEffect( () => { 
                const fetchUsers = async () => {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data)
                //setUsers(response.data);
            }
              fetchUsers()
        },[users]);
  
  return (
    <>
    <h2>All Users</h2>
    <ul>
        {
          users.map(user => <UserRow key={user.email} user={user}/>)
        }
    </ul>
    </>
  )
}

export default UserList