import React, {useState, Component} from 'react'
//components
import NavBar2 from './NavBar'
import {NavLink} from 'react-router-dom'

function Settings({user}) {

    return (
      <>
        <NavBar />
        <div className = "container floating-left">
        <h2>Settings</h2>
        <br/><br/>
        <form>
            <input type='text' placeholder = 'User Name'/>
            <input className = "displayInline" type='text' placeholder='Add Members (by Username)' /> 
            <div className = "roundBtn displayInline marginLeft">{'+'}</div>
            <div className = "addingMembers"> </div>
            <br/><br/>
            <input className = "loginButton" type='submit' value = "CREATE"/>
            <NavLink to = "/" >
                <div className = "greenBtn" >{'<'} BACK </div>
            </NavLink> 
            <br/><br/><br/>
        </form>
        </div>
      </>
    )
}

export default Settings;

