import React from "react"
//components
import GroupchatsList from "../Groupchat/GroupchatsList"
import Groupchat from "../Groupchat/Groupchat"
import Chat from "../Groupchat/Chat"

import NavBar from "../UI/NavBar"
import Pending from "../UI/Pending"
import BottomBar from "../UI/BottomBar"

import Todo from "./Todo"



const Todo2 = ({gcs, setChatSelected, todo, activeChat, refreshList}) => {

    return (
        <>
        <NavBar />
        <div className='container'>
        <GroupchatsList gcs = {gcs} setChatSelected = {setChatSelected} />
        {localStorage.getItem("isChatSelected") === 'true' ? (<>
            <div className="rightContainer">
            <div className="whiteHeader"> {activeChat.icon} {activeChat.name}</div>
            <div className="chat">
            <Todo todo = {todo} activeItem = {activeChat} gid = {activeChat.id} refreshList = {refreshList}/>
            </div>
            <BottomBar />
            </div>
        </>) 
        : (<Pending />)}
        </div> 
        </>
    )
}

export default Todo2