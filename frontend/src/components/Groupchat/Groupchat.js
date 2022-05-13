import { BrowserRouter, Routes, Route, Switch, Link, NavLink } from "react-router-dom";
//components
import BottomBar from "../UI/BottomBar"
import Chat from "./Chat";
import Todo from "../Todo/Todo";

const Groupchat = ({activeChat, chat, uid, groupDescription}) => {
    const PageNotFound = () => {
        <p>Go back home</p>
    }

    return (
        <BrowserRouter>
        <div className="rightContainer">
            <div className="whiteHeader"> {activeChat.name} </div>
            <div className="chat">
            <Routes>
                <Route element  = {<Chat chat = {chat} gid = {activeChat.id} uid = {uid}
                />} path = "/" exact  = {true} />
                <Route path = "/todo" element = {<Todo activeItem = {activeChat} gid = {activeChat.id}/>} />
                <Route element = {PageNotFound} />
            </Routes>
            </div>
            <BottomBar />
        </div>
        </BrowserRouter>
    )
}

export default Groupchat