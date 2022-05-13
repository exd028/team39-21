import React, { Component } from "react";
import '../Other/components.css';
import axios from "axios";
//components
import Modal from "./TodoModal.js";
import getToken from "../Login/getToken";

class Todo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        activeChat: this.props.activeItem,
        groupid: this.props.activeItem.id,
        todoList: this.props.todo,
        modal: false,
        activeItem: {
          group: null,
          title: "",
          description: "",
          completed: false,
        },
      };
    }

    componentDidMount() {
      this.refreshList();
    }

    refreshList = (id) => {
      axios
      .get(`http://localhost:8000/api/group-todos/${this.state.activeChat.id}/`,{headers: {"Authorization": "Token "+getToken()}})
      .then((res) => this.setState({ todoList: res.data.todos }))
      .catch((err) => console.log(err));
    };

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    createItem = () => {
      const item = { group: this.state.groupid, title: "", description: "", completed: false };

      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    handleSubmit = (item) => {
      this.toggle();
      const newItem = {
        "group": this.state.groupid,
        "title": item.title,
        "description": item.description,
        "completed": item.completed
      }
      if (item.id) {
      axios
          .put(`http://localhost:8000/api/todos/${item.id}/`, newItem,{headers: {"Authorization": "Token "+getToken()}})
          .then((res) => {
            this.refreshList()});
      return;
      }
      axios
      .post(`http://localhost:8000/api/todos/`, newItem,{headers: {"Authorization": "Token "+getToken()}} )
      .then((res) => this.refreshList());
    };

    handleDelete = (item) => {
      this.toggle();
      const newItem = {
        "group": item.id,
        "title": item.title,
        "description": item.description,
        "completed": item.completed
      }
      axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`,{headers: {"Authorization": "Token "+getToken()}})
      .then((res) => this.refreshList());
    };

    setChecked = (e) => {
      let { name, value } = e.target;

      if (e.target.type === "checkbox") {
      value = e.target.checked;
      }

      const activeItem = { ...this.state.activeItem, [name]: value };

      this.handleSubmit();
    };


    renderTabList = () => {
      return (
          <div className="nav">
          </div> 
        );
      };
    
      renderItems = () => {

        const { viewCompleted } = this.state;
        const newItems = this.state.todoList;
    
        return newItems.map((item) => (
            <div className="container">
              <div className="round">
                <li
                  key={item.id}
                  className="todo-list"
                  onClick={() => this.editItem(item)}
                  >
                    {item.title} <span className = "displayInline marginLeft description" > {item.description} </span>

                    <input type="checkbox"
                       checked = {item.completed}
                       onChange={this.setChecked} />
                    <label for="checkbox"></label>
              </li>
            </div>
          </div>
        ));
      }
    
      render() {
        return (
          <main>
            <div className="whiteHeader"> - Todo
                <button
                      className="add-btn"
                      onClick={this.createItem}
                    >
                      +
                </button>
              </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                    {this.renderItems()}
                </ul>
            {this.state.modal ? (
              <Modal
                portalClassName= "modal"
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
                onDelete={this.handleDelete}
              />
            ) : null}
            
          </main>
        );
      }
    }
    
    export default Todo;
