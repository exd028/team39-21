import React from 'react';
import logo from '../images/logo-removebg-preview.png';
import logout from '../images/logout.png';
import { Link, NavLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from '../App/HomePage';

const NavBar = () => {

    const signOut = () => { 
        window.localStorage.setItem('isChatSelected', JSON.stringify(false));
        window.localStorage.setItem('activeChat', "{}");
        sessionStorage.clear();
        window.location.reload(false);
        window.location.replace("http://localhost:3000/")
    }

    return (
        <div className="navbar">
        <img className = "logo" src={logo} alt="Logo" />
        <img className = "settingsIcon" src={logout} onClick = {() => signOut()}/>
        </div>
    )
}

export default NavBar