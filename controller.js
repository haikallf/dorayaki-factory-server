"use strict";

var response = require("./res");
var connection = require("./connect");

exports.index = function (req, res) {
  response.ok("REST App Working", res);
};

exports.showAllDorayaki = function (req, res) {
  connection.query("SELECT * FROM item", function (error, rows, fileds) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
