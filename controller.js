"use strict";

var response = require("./res");
var connection = require("./connect");
var mysql = require("mysql2");
const nodemailer = require("nodemailer");
const { options } = require("./middleware");

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

exports.showAllIngredients = function (req, res) {
  var query = "SELECT * FROM bahan_baku";
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.addIngredients = function (req, res) {
  var namaBahan = req.body.namaBahan;
  var stokBahan = req.body.stokBahan;
  var query = `INSERT INTO bahan_baku(namaBahan, stokBahan) VALUES ('${namaBahan}', '${stokBahan}')`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.editIngredients = function (req, res) {
  var idBahan = req.params.id;
  var namaBahan = req.body.namaBahan;
  var stokBahan = req.body.stokBahan;

  var query = `UPDATE bahan_baku SET namaBahan = '${namaBahan}', stokBahan = '${stokBahan}' WHERE idBahan = '${idBahan}'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json({ success: true, message: "Update success!" });
    }
  });
};

exports.showIngredientDetailsById = function (req, res) {
  var idBahan = req.params.id;
  var query = `SELECT * FROM bahan_baku WHERE idBahan = '${idBahan}'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

// EMAIL
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "polarisgray4@gmail.com",
    pass: "Haikallf-17",
  },
});

const emailDetails = {
  from: "polarisgray4@gmail.com",
  to: "haikalfadil68@gmail.com",
  subject: "Penambahan Stok Dorayaki",
  text: "Halo Admin, ada request penambahan stok dorayaki ya.",
};

exports.sendMail = function (req, res) {
  transporter.sendMail(emailDetails, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      res.json(info.response);
    }
  });
};
