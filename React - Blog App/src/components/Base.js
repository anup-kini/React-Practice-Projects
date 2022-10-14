import React from 'react'
import CustomNavbar from './Navbar'



const Base = ({title="Welcome to our website", children}) => {
  return (
    <div>
       <CustomNavbar/>
        {children}
        
    </div>
  )
}

export default Base