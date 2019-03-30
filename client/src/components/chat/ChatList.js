import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import axios from "axios";
import ChatDetail from "../components/ChatDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chatLists: []
    };
  }

  componentDidMount() {
    axios.get(`/api/chats/list`).then(res => {
      const chatLists = res.data;
      this.setState({ chatLists });
    });
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.chatLists.map(chatList => (
            <ListGroupItem tag="a">
              <Link to={`/chatDetail/${chatList._id}`}>
                {chatList.roomTitle}
              </Link>
              <Route
                path={`/chatDetail/${chatList._id}`}
                component={ChatDetail}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ChatList;
