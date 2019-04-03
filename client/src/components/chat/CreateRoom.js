import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import axios from "axios";

//import io from "socket.io-client";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      roomTitle: "",
      createdBy: ""
    };
    //this.socket = io("localhost:8080");

    this.toggle = this.toggle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onFormSubmit() {
    const chatData = this.state;
    axios.post("/api/chats/create", chatData).then(res => {
      //some response msg
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel} Create Chat Room
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>New Chat Room</ModalHeader>
          <Form onSubmit={this.onFormSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="inputRoomTitle">Chat Room Title:</Label>
                <Input
                  type="text"
                  name="roomTitle"
                  id="inputRoomTitle"
                  placeholder="Required field"
                  value={this.state.roomTitle}
                  onChange={e => this.setState({ roomTitle: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="inputCreatedBy">Your Name:</Label>
                <Input
                  type="text"
                  name="createdBy"
                  id="inputCreatedBy"
                  placeholder="Required field"
                  value={this.state.createdBy}
                  onChange={e => this.setState({ createdBy: e.target.value })}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Create</Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CreateRoom;
