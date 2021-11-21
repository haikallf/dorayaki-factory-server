var connection = require("../connect");
var mysql = require("mysql2");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// controller for registration
exports.registration = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    name: req.body.name,
  };

  var query = "SELECT email FROM ?? WHERE ?? = ?";
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Registration success!", res);
          }
        });
      } else {
        response.ok("Email is already used!", res);
      }
    }
  });
};

// controller for login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    username: req.body.username,
  };

  // var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var query = `SELECT * FROM user WHERE username='${
    post.username
  }' AND password='${md5(post.password)}'`;
  // var table = [
  //   "user",
  //   "password",
  //   md5(post.password),
  //   "username",
  //   post.username,
  // ];
  query = mysql.format(query);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });
        username = rows[0].id;
        var data = {
          username: username,
          access_token: token,
          ip: ip.address(),
        };

        var query = "INSERT ?? SET ?";
        var table = ["access_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "JWT token generated successfully",
              token: token,
              currUser: data.username,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email or password is invalid!" });
      }
    }
  });
};

exports.requestPage = function (req, res) {
  response.ok("Ini halaman requests", res);
};
