import React from 'react'

import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../components/Base'
import { signUp } from '../services/user-service'
import {toast} from 'react-toastify';

const Signup = () => {

  
 const [data, setData] = useState({

        name:'',
        email:'',
        password:'',
        about:'',
  
 })

 const [error, setError] = useState({
    errors:{},
    isError:false
 })

 const handleChange = (event) => {
     setData({
        ...data,[event.target.name] : event.target.value
     })
 }

 //Reseting the Form
 const resetData = () =>{
    setData({ 
    name:'',
    email:'',
    password:'',
    about:''});
 }

// Submiting the form
const submitForm = (event) => {
    event.preventDefault();
   // console.log(data);

    // if(error.isError){
    //    toast.error("Form data is invalid, correct all details and submit the form")
    //    return;
    // }

    // data validate

    // call server api for sending data
    signUp(data)
           .then((response) => {
            console.log(response)
            toast.success("User is registered Successfully !! userid "+response.id);
            setData({ 
              name:'',
              email:'',
              password:'',
              about:''});
          })
           .catch(error => {
              console.log(error);

              setError({
                errors : error,
                isError:true
              })

               if(error.isError && error.response.status === 400){
                     toast.error("Form data is invalid, correct all details and submit the form")
               }
          });
}

  return (
     <Base>
       <Container>
          <Row className='mt-4'>
               <Col sm={{size:6,offset:3}}>
               <Card color='dark' inverse> 
              <CardHeader>
                   <h3>Fill Information to Register !!</h3>
              </CardHeader>
              <CardBody>
                  {
                
                   
                      <Form onSubmit={submitForm} noValidate>
                        {/* {creating name field} */}
                          <FormGroup>
                                <Label for='name'>Enter Name</Label>
                                <Input type='text' placeholder='Enter Name Here' id='name'
                                value={data.name}
                                name='name'
                                onChange={e => handleChange(e)}
                                invalid={error.errors?.response?.data?.name ? true : false}/>
                            <FormFeedback>
                            {error.errors?.response?.data?.name}
                            </FormFeedback>    
                          </FormGroup>
                        {/* {creating email field} */}
                          <FormGroup>
                                <Label for='email'>Enter Email</Label>
                                <Input type='email' placeholder='Enter Email Here' id='email'
                                                                value={data.email}
                                                                name='email'
                                                                onChange={e => handleChange(e)}
                                                                invalid={error.errors?.response?.data?.email ? true : false}/>
                                       <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>   
                          </FormGroup>
                        {/* {creating password field} */}
                          <FormGroup>
                                <Label for='password'>Enter Password</Label>
                                <Input type='password' placeholder='Enter Password Here' id='password'
                                                                value={data.password}
                                                                name='password'
                                                                onChange={e => handleChange(e)}
                                                                invalid={error.errors?.response?.data?.password ? true : false}/>
                                                                <FormFeedback>
                                                                     {error.errors?.response?.data?.password}
                                                                 </FormFeedback>   
                          </FormGroup>
                        {/* {creating about field} */}
                          <FormGroup>
                                <Label for='about'>About</Label>
                                <Input type='textarea' placeholder='About you' id='about' style={{height:'150px'}}
                                                                value={data.about}
                                                                name='about'
                                                                onChange={e => handleChange(e)}
                                                                invalid={error.errors?.response?.data?.about ? true : false}/>
                                                                <FormFeedback>
                                                                     {error.errors?.response?.data?.about}
                                                                 </FormFeedback>   
                          </FormGroup>
                          <Container className='text-center'>
                             <Button color='light' outline>
                                Register 
                             </Button>
                             <Button color='secondary' type='reset' className='m-2' onClick={resetData}>
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

export default Signup