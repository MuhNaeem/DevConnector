import React, { Component } from "react";
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import AppNavbar from "./components/AppNavbar";
import ChatDetail from "./ChatDetail";
import CreateRoom from "./CreateRoom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

//import React, { Component } from "react";
import PropTypes from "prop-types";
//import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chatLists: []
    };
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    axios.get(`/chats/list`).then(res => {
      const chatLists = res.data;
      this.setState({ chatLists });
    });
  }

  sendChatId(i) {
    return <ChatDetail chatId={i} />;
  }

  render() {
    return (
      <div className="Chat">
        {/* <AppNavbar /> */}
        <CreateRoom />
        <hr />
        <h3>Chat Room List</h3>
        <Router>
          <ListGroup>
            {this.state.chatLists.map(chatList => (
              <ListGroupItem tag="a" key={chatList._id}>
                <Link to={`/chatDetail`}>
                  {chatList.roomTitle}
                  {this.sendChatId(chatList._id)}
                </Link>
                <Route path={`/chatDetail`} component={ChatDetail} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </Router>
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  //errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Chat));

//export default Chat;
