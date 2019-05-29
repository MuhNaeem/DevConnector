const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  freelancer: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  status: {
    type: String,
    required: true,
    default: "Ongoing"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  rate: {
    type: Number,
    required: true
  },
  days: {
    type: Number,
    required: true
  },

  // client: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users"
  //     },
  //     text: {
  //       type: String,
  //       required: true
  //     },
  //     name: {
  //       type: String
  //     },
  //     avatar: {
  //       type: String
  //     }
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
