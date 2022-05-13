import BottomBar from "./BottomBar";
import React, { Component } from "react";
import Modal from "./TodoModal.js";
import './components.css';
import axios from "axios";

class Todo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        todoList: [],
        modal: false,
        activeItem: {
          title: "",
          description: "",
          completed: false,
        },
      };
    }

    componentDidMount() {
        this.refreshList();
      }
    
    refreshList = () => {
        axios
        .get("/api/todos/")
        .then((res) => this.setState({ todoList: res.data }))
        .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
        this.toggle();

        if (item.id) {
        axios
            .put(`/api/todos/${item.id}/`, item)
            .then((res) => this.refreshList());
        return;
        }
        axios
        .post("/api/todos/", item)
        .then((res) => this.refreshList());
    };

    handleDelete = (item) => {
        this.toggle();

        axios
        .delete(`/api/todos/${item.id}/`)
        .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };

        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
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
          <li
            key={item.id}
            className="todo-list"
            onClick={() => this.editItem(item)}
          >
            
            <div class="container">
              <div class="round">
                <input type="checkbox"
                       checked = {item.completed}
                       onChange={this.setChecked} />
                 <label for="checkbox"></label>
            </div>
          </div>

        {item.title}
        </li>
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
                <ul className="todo-list list-group-flush border-top-0">
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
