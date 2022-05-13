import {useState, useEffect} from 'react';
import { InputGroup } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import React from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';


//Components
import getToken from '../Login/getToken';
import logo from '../images/logo.png';
import ResetPassword from './ResetPassword';
import TokenSubmit from './TokenSubmit';

const Reset = () => {

    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");
    const [uid, setUID] = useState(undefined);

    return (
        <>
        <img src = {logo} className = "rightBigLogo"></img>
        {
            !sent ?
            (<ResetPassword setSent = {setSent} email = {email} setEmail = {setEmail} setUID = {setUID}/>)
            :
            (<TokenSubmit email = {email} />)
        }
        </>
    )
}

export default Reset;