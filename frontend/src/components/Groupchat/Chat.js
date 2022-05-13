import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import getToken from '../Login/getToken';

const Chat = ({chat, gid, uid, refreshData}) => {

    const[newMessage, setNewMessage] = useState([]);

      // Displaying the messages
      const mess = chat.map(m => {
          return(
          <div className = "message" key = {m.id}>
            <div className = "messageAuthor">{m.author} </div> 
            <div className = "messageText">{m.message} </div>
            <div className = "messageTimestamp" >{(m.timestamp.split(':'))[0] + ':' + (m.timestamp.split(':'))[1]}</div>
          </div>
          )
      });


    // Sending a new message
    const sendMessage = () => {
      const msg = {
        "text": newMessage,
        "group": gid,
        "user": uid,
      };

      

      axios
      .post("http://localhost:8000/api/messages/", msg, {headers: {"Authorization": "Token " + getToken()}})
      .then((res) => {
          setNewMessage("");
          window.location.reload(false);
        }
      )
      .catch((err) => console.log(err));     
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage();
    }
  }

    return (
        <>
            <div className = "scrollChat"> {mess} </div>
            <div className = "fixedBottom">
                <textarea placeholder="Write you message here" onChange = {e => {
                  setNewMessage(e.target.value);
                  }}
                  onKeyDown = {e => {onEnterPress(e)}}
                  ></textarea>
                <div className = "roundBtn floating-right" onClick = {() => sendMessage()}>{'>'}</div>
            </div>

        </>
    )
}

export default Chat