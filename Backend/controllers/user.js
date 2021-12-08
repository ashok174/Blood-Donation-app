"use strict";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      blood_type: req.body.blood_type,
      is_admin: req.body.is_admin,
      admin_approval: req.body.admin_approval,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User Added Successfully !",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured!",
        });
      });
  });
};

const login = (req, res, next) => {
  var first_name = req.body.user_name;
  var password = req.body.password;

  User.findOne({ $or: [{ email: first_name }, { phone: first_name }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (password == user.password) {
            result = true;
          }
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign(
              { first_name: user.first_name },
              "AZDFGH($67",
              { expiresIn: "1h" }
            );
            let _id = user._id;
            let is_admin = user.is_admin;
            let user_name = user.first_name;
            res.json({
              message: "login successfull",
              token,
              _id,
              is_admin,
              user_name,
            });
          } else {
            res.json({
              message: "password doesnot match",
            });
          }
        });
      } else {
        res.json({
          message: "no user found!",
        });
      }
    }
  );
};

//change password
const changePassword = (req, res, next) => {
  var first_name = req.body.user_name;
  var password = req.body.oldpassword;

  User.findOne({ $or: [{ email: first_name }, { phone: first_name }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (password == user.password) {
            result = true;
          }
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign(
              { first_name: user.first_name },
              "AZDFGH($67",
              { expiresIn: "1h" }
            );
            let _id = user._id;
            let is_admin = user.is_admin;
            let user_name = user.first_name;
            res.json({
              message: "login successfull",
              token,
              _id,
              is_admin,
              user_name,
            });
          } else {
            res.json({
              message: "password doesnot match",
            });
          }
        });
      } else {
        res.json({
          message: "no user found!",
        });
      }
    }
  );
};
// search specific users
const index = (req, res, next) => {
  let user_id = req.body._id;
  User.findById(user_id)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};
// find user blood type or address
const findUser = (req, res, next) => {
  var search = req.body.address;

  User.find({ $or: [{ address: search }, { blood_type: search }] })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};
// search people with specific blood types
const searchBloodType = (req, res, next) => {
  let blood_type = req.body.blood_type;
  User.find({ blood_type: blood_type })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};
//show the list of user
const show = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};
module.exports = {
  register,
  login,
  show,
  findUser,
  index,
  searchBloodType,
};
