import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class TodoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave, onDelete } = this.props;

      return(
         <div className="modal" isOpen={true} toggle={toggle}>
             <div className="modal-content">
                 <div className="modal-header" toggle={toggle}>
                     <button className="modal-close" onClick= {toggle}> x </button>
                 </div>
                 <div className="modal-body">
                   <Form>
                    <FormGroup>
                      <Label for="todo-title"></Label>
                      <Input className="modal-title"
                        type="text"
                        id="todo-title"
                        name="title"
                        value={this.state.activeItem.title}
                        onChange={this.handleChange}
                        placeholder="Add a Title..."
                      />
                    </FormGroup>
           
                    <FormGroup>
                      <h4>Description:</h4>
                      <textarea className = "modal-textarea"
                        type="text"
                        id="todo-description"
                        name="description"
                        value={this.state.activeItem.description}
                        onChange={this.handleChange}
                        placeholder="Add any extra information here..."
                      />
                  </FormGroup>

                  <FormGroup>
                    <h4>Completed?</h4>
                      <Input
                      type="checkbox"
                      name="completed"
                      checked={this.state.activeItem.completed}
                      onChange={this.handleChange}
                      />
                  </FormGroup>
                </Form>
                </div>
                <div className="modal-footer">
                  <button
                    className= "modal-save"
                    onClick={() => onSave(this.state.activeItem)}
                    >
                    Save
                  </button>
                  <button
                    className= "modal-delete"
                    onClick={() => onDelete(this.state.activeItem)}
                    >
                    Delete
                  </button>
                 </div>
             </div>
         </div> 
      )
  }
}
