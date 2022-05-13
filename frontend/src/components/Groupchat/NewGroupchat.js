import React, {useState, Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import getToken from '../Login/getToken';

//components
import NavBar from '../UI/NavBar';

function NewGroupchat({createGroupchat, gid}) {
  
  const[groupName, setGroupName] = useState();
  const[groupDescription, setGroupDescription] = useState();
  const[members, setMembers] = useState([]);
  let idList = [];
  let username = "";

  const handleSubmit = async e => {
    e.preventDefault();
    if (groupName === undefined){
      alert("Please give your new group a name !");
    }
    else if(groupName.length < 2){
      alert("That's pretty short for a group name, don't you think? Try making it longer!");
    }
    else if (members === []){
      alert("A group with just one member would be boring, wouldn't it ?");
    }
    else {

      const {data} = await axios.get("http://localhost:8000/api/users/", {headers: {"Authorization": "Token "+getToken()}})
      let userList = JSON.parse(JSON.stringify(data)).results;
      idList = [];
      for(let i=0; i<members.length; i++){
        idList.push(
          userList.find(item => {
            return item.username == members[i];
          }).id
        );
      }
      idList.push(userList.find(item => {return item.id == gid}).id);
      createGroupchat(groupName, groupDescription, idList, gid);
      window.location.reload(false);
      window.location.replace("http://localhost:3000/");
      
    }
  }
  

  async function addMember(){
    var newMember = document.getElementById("member").value;
    let validUsers = [];
    if(newMember === "")
      alert("Please add a valid user !");
    else {
      //validating if input username is an existing user
      const{data} = await axios.get("http://localhost:8000/api/users/", {headers: {"Authorization": "Token "+getToken()}})
      let userList = JSON.parse(JSON.stringify(data)).results;
      username = userList.find(item => {return item.id==gid}).username;

      if(newMember == username){
        alert("You are already adding yourself to the group! Remove your username from the list");
      }

      userList.forEach(element => {
        if(element.id != gid) {
          validUsers.push(element.username);
        }
      });
      if(!validUsers.includes(newMember)){
        alert("That username does not exist within the database! Enter a valid username!");
      }
      else{
        const allUsers = [ ...members, newMember];
        setMembers(allUsers);
        document.getElementById("member").value = "";
      }
      
    }
  }

  const membersList = members.map(m => {
    return(
        <div className = "membersList"> 
          {m} 
          <div className = "deleteButton displayInline" onClick = {() => deleteMember(m)}> - </div>
        </div>
        )
    }
)
  const deleteMember = (m) => {
    setMembers(members.filter(function(person) { 
      return person !== m 
    }));
  }

    return (
      <>
        <NavBar />
        <div className = "container floating-left">
        <form onSubmit = {handleSubmit}>
          <input className = "modal-title" type = "text" placeholder = "Name your new Groupchat" onChange={e => setGroupName(e.target.value)}/>
          <br/><br/>
          <input type='text' placeholder='Description' onChange={e => setGroupDescription(e.target.value)}/>
          <input id = "member" className = "displayInline" type='text' placeholder='Add Members (by Username)' /> 
          <div className = "roundBtn displayInline marginLeft" onClick = {() => addMember()}>{'+'}</div>
          <div className = "addingMembers"> {membersList} </div>
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

export default NewGroupchat;

