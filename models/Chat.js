const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Chat Schema
const ChatSchema = new Schema({
  roomTitle: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
});

module.exports = Chat = mongoose.model("Chat", ChatSchema);

//const Chat =  module.exports = mongoose.model('Chat', ChatSchema);

module.exports.addChatRoom = function(newChat, callback) {
  newChat.save(callback);
};
