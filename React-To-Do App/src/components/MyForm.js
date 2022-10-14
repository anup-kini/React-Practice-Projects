import React, { Component } from 'react'
import { FormErrors } from './FormErrors';
import axios from 'axios';

class MyForm extends Component {

 constructor(props) {
   super(props)
 
   this.state = {
       email:'',
       password:'',
       formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
   }
    
 }   

 changeHandler = (e) =>{

    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
 }

 validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid !!';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' password should be 6 characters long !!';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

 submitHandler = (event) => {
     
     let {email,password} = this.state;
     axios.post('http://localhost:3000/users',{
         email,
         password
     }).then(response => console.log(response))
     .catch(error => console.log(error))
    // alert('User Added Successfully...')
     event.preventDefault();
 }

 validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


  render() {
    return (
      <div style={{width:'50%', margin:'20px'}}>
         <form onSubmit={this.submitHandler} >
            <h2>Sign Up</h2>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`} >
          <label>Email address</label>
          <input 
          type="email" 
          required className="form-control"
          name="email" 
          placeholder="Enter email" 
          onChange={this.changeHandler}
          value={this.state.email}/>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label>Password</label>
          <input 
          type="password" 
          className="form-control" 
          name="password" 
          placeholder="Password" 
          onChange={this.changeHandler}
          value={this.state.password}/>
        </div>
        <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Register</button>
      </form>
      </div>
    )
  }
}

export default MyForm