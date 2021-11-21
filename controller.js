"use strict";

var response = require("./res");
var connection = require("./connect");
var mysql = require("mysql2");

exports.index = function (req, res) {
  response.ok("REST App Working", res);
};

exports.showAllDorayaki = function (req, res) {
  connection.query("SELECT * FROM item", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.showDorayakiDetailById = function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM item WHERE idItem = ${id}`,
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

exports.showRequests = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM requests", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.showAllUser = function (req, res) {
  connection.query("SELECT * FROM user", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        success: true,
        message: "JWT token generated successfully",
      });
    }
  });
};

exports.showAllReceipe = function (req, res) {
  var query = "SELECT * FROM resep";
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

// add resep
exports.addReceipe = function (req, res) {
  var query = "INSERT INTO resep() VALUES (";
};
