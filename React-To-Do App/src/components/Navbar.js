import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to={'/'}>
   <img style={{height:'5%',width:'5%'}} alt='#' src='https://banner2.cleanpng.com/20180728/sac/kisspng-computer-icons-user-symbol-light-client-icon-5b5cfd0bbe3066.907360791532820747779.jpg'>

   </img>
  </NavLink>
 
  <div className="collapse navbar-collapse" >
    <div className="navbar-nav">
      <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/'}>
        Home 
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/userList'}>
        User List
      </NavLink>
    </div>
  </div>
</nav>

  )
}

export default Navbar