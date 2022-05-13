import React, {useState, useEffect, Component} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from "axios";

//components
import logo from '../images/logo.png';
import carPhoto from '../images/car.png';
import SignUp from '../Login/SignUp';
import Reset from '../Reset Password/Reset';
import getToken from './getToken';

async function loginUser(credentials){
  return fetch('http://localhost:8000/api/api-token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function SignIn({signIn}) {
  
  var[token, setToken] = useState();
  const[username, setUsername] = useState();
  const[password, setPassword] = useState(); 
  const[id, setId] = useState();

  

  const handleSubmit = async e => {
    e.preventDefault();
    if (username === undefined || password === undefined){
      alert("Please input credentials !");
      window.location.reload(false);
    }
    const token = await loginUser({
      username,
      password
    });

    if (JSON.stringify(token).includes("errors")){
      alert("Incorrect credentials. Please try again !");
      window.location.reload(false);
    }
    else{
      sessionStorage.setItem("token",JSON.stringify(token));
      setToken(token);
    }
  }


  token = getToken();
  if(!token || token == null) {
    return (
      <>
        <BrowserRouter>
        <Routes>
        <Route path = "/reset" element = {<Reset />}/>
        <Route path = "/signUp" element = {<SignUp />} />
        <Route path = "/" element = {<>
        <img src = {carPhoto} className = "leftBottom"></img>
        <img src = {logo} className = "rightBigLogo"></img>
          <div className = "signInForm">
          <h2>Please Sign In</h2>
          <p className = "description" > Start organising your next <span className = "orange">venture</span> with you friends ! </p>
          <br/><br/>
          <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Input Username' onChange={e => setUsername(e.target.value)}/>
              <input type='password' placeholder='Input Password' onChange={e => setPassword(e.target.value)}/> 
              <br/>
              <p className = "description">Forgot your password ? <NavLink className = "orangeLink" to = "/reset">Reset here !</NavLink></p>
              <br />  
              <p className = "description">New here ? <NavLink className = "orangeLink" to = "/signUp">Sign Up !</NavLink></p>
              <br/><br/>
              <input className = "loginButton" type='submit' value = "LOG IN"/>
          </form>
        </div>
        </>} />
        </Routes>
        </BrowserRouter>
      </>
    )
  }

  //at this point, token has been generated
  signIn(true);
    
  return(<></>)

}
export default SignIn;

