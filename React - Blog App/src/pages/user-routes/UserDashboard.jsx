import React from 'react'
import { Container } from 'reactstrap'
import AddPost from '../../components/AddPost'
import Base from '../../components/Base'

const UserDashboard = () => {
  return (
     <Base>
       <Container>
          <AddPost/>
          {/* <NewFeed/> */}
      </Container>
     </Base>
  )
}

export default UserDashboard