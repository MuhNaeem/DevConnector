const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const config = require('../config/database');

// Chat Detail Schema
const ChatDetailSchema = new Schema({
  chatMsg: {
    type: String,
    required: true
  },
  msgBy: {
    type: String,
    required: true
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  }
});

module.exports = ChatDetail = mongoose.model("ChatDetail", ChatDetailSchema);

//const ChatDetail =  module.exports = mongoose.model('ChatDetail', ChatDetailSchema);

module.exports.addChatMsg = function(newMsg, callback) {
  newMsg.save(callback);
};
