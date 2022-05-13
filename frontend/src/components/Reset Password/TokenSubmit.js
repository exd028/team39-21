import React from 'react'
import { useState } from 'react';
//components
import ResetSuccess from './ResetSuccess';
import ResetFail from './ResetFail';
import axios from 'axios';

export default function TokenSubmit({email}) {

    const [userToken, setUserToken] = useState("");
    const [newPass, setNewPass] = useState("");    
    const [verified, setVerified] = useState(undefined);


    const resetData = () => {
        setVerified(undefined);
    } 

    async function resetPassword(newPass, email, userToken){
        // validate if userToken == originalToken in backend
        // setVerified based on response
        var errors = []
        if(newPass.length < 8){
            errors.push("Password length must be atleast 8 characters long");
        }
        if(newPass.search(/[a-z]/i) < 0){
            errors.push("Password must contain atleast one letter");
        }
        if(newPass.search(/[0-9]/) < 0){
            errors.push("Password must contain atleast one letter");
        }
        if(newPass.search(/[a-z]/) < 0){
            errors.push("Password must contain atleast one lowercase letter");
        }
        if(newPass.search(/[A-Z]/) < 0){
            errors.push("Password must contain atleast one uppercase letter");
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        }
        else{
            const request = await axios.post(
            'http://localhost:8000/api/password-reset/', 
            {'token':userToken, 'email':email, 'password':newPass});
            let response = request.data;
            if (JSON.stringify(response).includes("ERROR")){
                setVerified(false);
            }
            else if (JSON.stringify(response).includes("SUCCESS")){
                setVerified(true);
            }
            else{setVerified(false);}
        }
       
    }

    return (
        <>
            <div className = "signInForm">
                <h3 className = "green center"> Please check your email for the token and don't close this page ! </h3>
                <input type = "text" placeholder = "Token" onChange = {e => setUserToken(e.target.value)}></input>
                <input type = "password" placeholder = "New Password" onChange = {e => setNewPass(e.target.value)}></input>
                <button className = "loginButton" type='submit' onClick = {() => resetPassword( newPass, email, userToken)}>RESET</button>
                {
                    verified === undefined ?(<></>)
                    :
                    (
                    <>
                        {
                            verified === true ?(<ResetSuccess resetData = {resetData}/>) : (<ResetFail/>)
                        }
                    </>
                    )
                }
            </div>
        </> 
    )
}
