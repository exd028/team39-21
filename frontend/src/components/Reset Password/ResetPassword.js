import React from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';


const ResetPassword = ({setSent, email, setEmail, setUID}) => {
  
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // SHOULD SEND THIS DATA TO THE SERVER
  const handleSubmit = async e => {
    e.preventDefault();
    if (email === "" || email === null) {
        alert("We can't send a link if you don't provide an email!");
    }
    else if(!validRegex.test(email)){
        alert("Your email doesn't seem to be a valid email address, please try again");
    }    
    const request = await axios.post('http://localhost:8000/api/email-exists/', {'email': email});
    let response = request.data;
    if(JSON.stringify(request.data).includes("ERROR")){
      alert("ERROR: "+email+" is not an existing email within the database, please input an existing email address!");
    }
    else if (JSON.stringify(request.data).includes("token")){
      const token = response.token;
      // console.log(token);
      emailjs.send('service_qfu05ls', 'template_rp0ebhg', {token, email}, '02IisS01KXZyMFVvA')
        .then((result) => {
            console.log(result.text);
            setSent(true);
        }, (error) => {
            console.log(error.text);
        });
      // setSent(true);


    }
  }

  return (
  <>
    <div className = "signInForm">
        <h2>Reset Password</h2>
        <p className = "description center" > Forgot your password ? No worries !</p>
        <div className = "size16 description center" > Input the email address you've registered with and we will send you a reset link in an email </div>
        <br/><br/>
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Input Email' onChange={e => setEmail(e.target.value)}/> 
            <br/>
            <input className = "loginButton" type='submit' value = "SEND TOKEN"/>
        </form>
    </div>
  </>
  )
}

export default ResetPassword;