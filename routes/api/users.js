const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const sgTransport = require("nodemailer-sendgrid-transport");

const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Veri = require("../../models/Veri");

const options = {
  auth: {
    api_user: "MuhNaeem",
    api_key: "prodev123"
  }
};

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save(function(err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            //Create a verification token for this user
            const token = new Veri({
              _userId: newUser.id,
              token: crypto.randomBytes(16).toString("hex")
            });

            token.save(function(err) {
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // Send the email
              const transporter = nodemailer.createTransport(
                sgTransport(options)
              );
              const mailOptions = {
                from: "no-reply@devconnectorfreelancer.herokuapp.com",
                to: newUser.email,
                subject: "Account Verification Token",
                text:
                  "Hello,\n\n" +
                  "Please verify your account by clicking the link:  \n" +
                  " http://localhost:3000" +
                  //req.headers.host +
                  "/confirmation/" +
                  token.token +
                  "\n"
              };
              transporter.sendMail(mailOptions, function(err) {
                if (err) {
                  return res.status(500).send({ msg: err.message });
                }
                res
                  .status(200)
                  .send(
                    "A verification email has been sent to " +
                      newUser.email +
                      "."
                  );
              });
            }); //loop-end
          });
          // .then(user => res.json(user))
          // .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!user.isVerified) {
        errors.email = "Your account has not been verified";
        return res.status(401).json(errors);
      } else if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   POST api/users/confirmation/:id
// @desc    Register user after confirmation of their accounts
// @access  Public
router.post("/confirmation/:token", (req, res) => {
  const { errors } = validateLoginInput(req.body);
  const tok = req.params.token;
  console.log(tok);
  Veri.findOne({ token: req.params.token })
    .then(token => {
      if (!token) {
        errors.email =
          "We were unable to find a valid token. Your token may have expired";
        console.log(token);
        return res.status(400).json(errors);
      }
      User.findOne({ _id: token._userId, email: req.body.email }).then(user => {
        if (!user) {
          errors.email = "We were unable to find a user for this token";
          return res.status(400).json(errors);
        }
        if (user.isVerified) {
          errors.email = "This user has already been verified";
          return res.status(400).json(errors);
        }
        // Verify and save the user
        user.isVerified = true;
        user.save().then(user => res.json(user));
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
