import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ResetSuccess({resetData}) {
  return (
    <>
      <br/>
      <br/>
      <br/>
      <h3 className = "green center"> Password has been reset !</h3>

      <NavLink className = "link" to = "/">
          <p> Go back to <span className = "orange" onClick = {resetData}>Sign In</span></p>
      </NavLink>
    </>
  )
}
