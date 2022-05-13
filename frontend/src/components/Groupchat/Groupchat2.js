import NavBar from "../UI/NavBar"
import GroupchatsList from "./GroupchatsList"
import Groupchat from "./Groupchat"
import Pending from "../UI/Pending"
import Chat from "./Chat"
import BottomBar from "../UI/BottomBar"

const Groupchat2 = ({gcs, setChatSelected, activeChat, chat, uid, refreshData}) => {
    return (
        <>
        <NavBar />
        <div className='container'>
        <GroupchatsList gcs = {gcs} setChatSelected = {setChatSelected} />
        {window.localStorage.getItem("isChatSelected") === 'true' ? (<>
            <div className="rightContainer">
            <div className="whiteHeader"> {activeChat.icon} {activeChat.name}</div>
            <div className="chat">
            <Chat chat = {chat} gid = {activeChat.id} uid = {uid} refreshData = {refreshData}/>
            </div>
            <BottomBar />
            </div>
        </>) 
        : (<Pending />)}
        </div> 
        </>
    )
}

export default Groupchat2