import React, { Component } from 'react'
import axios from 'axios';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// components imports
import Groupchat2 from '../Groupchat/Groupchat2';
import Todo2 from "../Todo/Todo2";
import getToken from '../Login/getToken';
import NewGroupchat from '../Groupchat/NewGroupchat';
import Location from '../Location/Location';


export class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isChatSelected: JSON.parse(window.localStorage.getItem('isChatSelected')) || false,
            gcs: [],
            chat: [],
            todo: [],
            groupList: [],
            currentGID: null,
            currentUsername: "",
            currentUID: null, 
            activeChat: JSON.parse(window.localStorage.getItem('activeChat')) || {},
        };
    }

    componentDidMount() {
        this.refreshData();
        this.refreshList();
        if(this.state.activeChat === {})
            ;
        else
            this.fetchChat(this.state.activeChat.id);
    }

    refreshData = () => {
        axios
        .get(`http://localhost:8000/api/user-groups/`,{headers: {"Authorization": "Token "+ getToken()}})
        .then(res => {
            //getting groups that the user is currently in
            this.setState({currentUsername: res.data.username, gcs: res.data.groups, currentUID: res.data.id});
        })
        .catch((err) => console.log(err));
    };

    refreshList = (id) => {
        axios
        .get(`http://localhost:8000/api/group-todos/${id}/`)
        .then((res) =>{
            this.setState({todo: res.data.todos});
        }) 
        .catch((err) => console.log(err));
      };

    setChatSelected = (gc) => {
        this.setState({activeChat: gc});
        window.localStorage.setItem('activeChat', JSON.stringify(gc));
        window.localStorage.setItem('isChatSelected', JSON.stringify(true));
        this.fetchChat(gc.id);
        this.refreshList(gc.id);
    }



    createGroupchat = async(groupName, groupDescription, members, uid) => {

        const group = {
            "name" : groupName,
            "description" : groupDescription,
        }

        //creating group
        axios
        .post("http://localhost:8000/api/groups/", group ,{headers: {"Authorization": "Token " + getToken()}})
        .then(res => this.refreshData())
        .catch(err => console.log(err))


        async function getgid(){
            const{data} = await axios.get("http://localhost:8000/api/groups/", {headers: {"Authorization": "Token " + getToken()}})
            return data.results;
        }

        let gid = 0; //default value
        let grouplist = await getgid();
        grouplist.forEach(e => {
            if(e.name == groupName){
                gid = e.id;
            }
        })

        members.forEach(member => {
            if(gid != 0){
                const groupuser = {
                    "user" : member,
                    "group" : gid,
                }
                //assigning users to groups
                axios
                .post("http://localhost:8000/api/groupusers/", groupuser, {headers: {"Authorization": "Token " + getToken()}})
                .then(res => this.refreshData())
                .catch(err => console.log(err))
            }
        });
    }

    fetchChat = (id) => {
        axios
            .get(`http://localhost:8000/api/group-messages/${id}/`,{headers: {"Authorization": "Token "+getToken()}})
            .then(res => {
                this.setState({chat: res.data.Messages, groupURL: res.data.group});
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <BrowserRouter>
            <Routes>
                <Route path = "/create" element = {<NewGroupchat createGroupchat = {this.createGroupchat} gid = {this.state.currentUID}/>}/>
                <Route path = "/" element = {
                    <Groupchat2 
                    gcs = {this.state.gcs} 
                    setChatSelected = {this.setChatSelected}  
                    activeChat = {this.state.activeChat} 
                    chat = {this.state.chat} 
                    uid = {this.state.currentUID}
                    refreshData = {this.refreshData}
                    />
                }
                />
                <Route path = "/todo" element = {
                <Todo2
                    gcs = {this.state.gcs}
                    setChatSelected = {this.setChatSelected} 
                    activeChat = {this.state.activeChat} 
                    todo = {this.state.todo} 
                    uid = {this.state.currentUID}
                    refreshList = {this.refreshList}
                />
                } 
                />
                <Route path = "/location" element = {<Location />} />
            </Routes>
            </BrowserRouter>
        )
    }
}

export default HomePage