const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Order = require("../../models/Order");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateOrderInput = require("../../validation/post");

// @route   GET api/orders/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Orders Works" }));

// @route   GET api/orders
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Order.find()
    .sort({ date: -1 })
    .then(orders => res.json(orders))
    .catch(err => res.status(404).json({ noorderfound: "No orders found" }));
});

// @route   GET api/orders/:id
// @desc    Get order by id
// @access  Public
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err =>
      res.status(404).json({ noorderfound: "No order found with that ID" })
    );
});
