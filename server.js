//const express = require('express');
//const path = require('path');
//const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//const config = require("./config/database");
const cors = require("cors");
const hbs = require("express-handlebars");

/////////////////////////////////////////
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const chats = require("./routes/api/chats");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Initialize socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Use Routes
app.use("/api/users", users);
app.use("/api/chats", chats);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Whenever someone connects this gets executed
io.on("connection", function(socket) {
  console.log("A user connected..........");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function() {
    console.log("A user disconnected........");
  });
});

userChat = [];
io.on("connection", function(socket) {
  console.log("A user connected");
  socket.on("setMsgBy", function(data) {
    console.log(data);
    // check this msgBy in chatroom of database
    userChat.push(data);
    socket.emit("userSet", { msgBy: data });
  });

  socket.on("msg", function(data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
  });
});

// Server static assests if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
