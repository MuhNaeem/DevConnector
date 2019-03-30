import React, { Component } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatDetails: []
    };
  }
  getChatData() {
    const chatId = this.props.chatId;
    axios.get("/api/chats/detail/" + chatId).then(response => {
      const chatDetails = response.data;
      this.setState({ chatDetails });
      //return this.state.chatDetails;
    });
    // return chatId;
  }
  render() {
    return (
      <div>
        <h1>Hi chat details will be here..where id is: {this.getChatData()}</h1>
        <ListGroup>
          {this.state.chatDetails.map(chatDetail => (
            <ListGroupItem>
              {chatDetail.chatMsg} By: {chatDetail.msgBy}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ChatDetail;
