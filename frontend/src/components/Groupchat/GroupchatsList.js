import React from "react"
import RoundBtn from "../UI/RoundBtn"
import {NavLink, BrowserRouter} from 'react-router-dom'

const GroupchatsList = ({gcs, setChatSelected}) => {

    //generating list of groupchats to render on home-page
    const groupChats = gcs.map(gc => {
        return(
            <NavLink to = "/" className = "link"><div className = "list" key = {gc.id} onClick = {() => setChatSelected(gc)}>
                {gc.icon} {gc.name}
            </div></NavLink>)
        }
    )
    
    //placing groupchats component in leftContainer
    return (
            <div className = "leftContainer">
            <div>
                {groupChats}
            </div>
            <NavLink to = "/create">
                 <RoundBtn/>
            </NavLink>
        </div>
    )
}

export default GroupchatsList