const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Order = require("../../models/Order");
// Profile model
const Profile = require("../../models/Profile");

// Validation
// const validateOrderInput = require("../../validation/post");

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

// @route   POST api/orders/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(order => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            rate: req.body.rate,
            days: req.body.days,
            avatar: req.body.avatar,
            user: req.user.id
          };

          // Add to comments array
          // order.comments.unshift(newComment);

          // // Add to already sent list
          // if (
          //   post.likes.filter(like => like.user.toString() === req.user.id)
          //     .length > 0
          // ) {
          //   return res
          //     .status(400)
          //     .json({ alreadySent: "User has already sent a proposal" });
          // }

          // Add user id to likes array
          // post.likes.unshift({ user: req.user.id });

          // Save
          order.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ order: "No order found" }));
    });
  }
);
