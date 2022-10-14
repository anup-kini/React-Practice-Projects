import React, { useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { login } from '../services/user-service'
import {toast} from 'react-toastify';
import { doLogin } from '../auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
 const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
      userName:'',
      password:''
  })

  const changeHandler = (event) => {
       setLoginDetails({
           ...loginDetails,[event.target.name]:event.target.value
       })
  }

  const loginSubmitHandler = (event) => {
      event.preventDefault();
      //console.log('login submited');
      login(loginDetails).then((data) => {
          
          console.log(data);
          // Save the data to localstorage
          doLogin(data,() => {
            console.log("login details has been stored to localstorage");
            //redirect to user dashboard page
              navigate("/user/dashboard");
          })

          toast.success("Login Success !!");

      }).catch(error => {
          console.log(error);
          if(error.response.status === 400 ||error.response.status === 404){
             toast.error(error.response.data.message);
          }
      })

  }

  const resetHandler = () => {
      setLoginDetails({
        userName:'',
        password:''
      })
  }

  return (
    <Base>
        <Container>
          <Row className='mt-4'>
               <Col sm={{size:6,offset:3}}>
               <Card color='dark' inverse> 
              <CardHeader>
                   <h3>Login Here !!</h3>
              </CardHeader>
              <CardBody>
                  {
                      <Form onSubmit={loginSubmitHandler}>
                        {/* {creating email field} */}
                        {/* {console.log(loginDetails)} */}
                          <FormGroup>
                                <Label for='email'>Enter Email</Label>
                                <Input type='email' placeholder='Enter Email Here' id='email'
                                name='userName'
                                value={loginDetails.userName}
                                onChange={changeHandler}/>
                          </FormGroup>
                         
                        {/* {creating password field} */}
                          <FormGroup>
                                <Label for='password'>Enter Password</Label>
                                <Input type='password' placeholder='Enter Password Here' id='password'
                                 name='password'
                                 value={loginDetails.password}
                                 onChange={changeHandler}/>
                               
                          </FormGroup>
                    
                          <Container className='text-center'>
                             <Button color='light' outline>
                                Login 
                             </Button>
                             <Button color='secondary' type='reset' className='m-2' outline
                             onClick={resetHandler}>
                                Reset 
                             </Button>
                          </Container>
                      </Form>
                   }
              </CardBody>
          </Card>
               </Col>
          </Row>
       </Container>
    </Base>
  )
}

export default Login