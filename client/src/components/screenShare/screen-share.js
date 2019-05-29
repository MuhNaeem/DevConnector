import React, { Component } from "react";
//import "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css";

class ScreenShare extends Component {
  render() {
    return (
      <div className="ScreenShare">
        <script src="https://cdn.temasys.io/adapterjs/0.15.x/adapter.min.js" />

        <script src="https://cdn.temasys.io/adapterjs/0.15.x/adapter.screenshare.js" />

        <script src="https://cdn.ably.io/lib/ably.min-1.js" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.1.2/simplepeer.min.js" />

        <script src="ably-screenshare.js" />

        <script src="connection-helper.js" />

        <div className="container-fluid" style={{marginTop: '5em'}}>
          <div className="container" id="join">
            <h4 id="online">Users online (0)</h4>

            <ul id="memberList" />
          </div>

          <div className="container" id="call" style={{display: 'none'}}>
            <video width="320" height="240" id="local" controls />

            <video width="320" height="240" id="remote" controls />

            <button className="btn btn-xs btn-danger" onclick="handleEndCall()">
              End call
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ScreenShare;
