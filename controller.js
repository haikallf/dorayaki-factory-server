"use strict";

var response = require("./res");
var connection = require("./connect");
var mysql = require("mysql2");
// var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const saltRounds = 10;
var md5 = require("md5");
var jwt = require("jsonwebtoken");

exports.index = function (req, res) {
  response.ok("REST App Working", res);
};

// AUTH
exports.registration = function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = md5(req.body.password);
  let name_ = req.body.name;

  var query = `SELECT * FROM user WHERE username = '${username}'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query2 = `SELECT * FROM user WHERE email = '${email}'`;
        query2 = mysql.format(query2);
        connection.query(query2, function (error, rows2) {
          if (error) {
            console.log(error);
          } else {
            if (rows2.length == 0) {
              // username dan email kosong
              var query3 = `INSERT INTO user(username, email, name, password) VALUES ('${username}', '${email}', '${name_}', '${password}')`;
              query3 = mysql.format(query3);
              connection.query(query3, function (error, rows3) {
                if (error) {
                  console.log(error);
                } else {
                  // res.send(rows3);
                  res.send({ message: "Registration success!" });
                }
              });
            } else {
              res.send({ message: "Email is already used!" });
            }
          }
        });
      } else {
        // cek email
        var query4 = `SELECT * FROM user WHERE email = '${email}'`;
        query4 = mysql.format(query4);
        connection.query(query4, function (error, rows4) {
          if (error) {
            console.log(error);
          } else {
            // kosong --> username isi
            if (rows4.length == 0) {
              res.send({ message: "Username is already used!" });
            } else {
              // isi --> username dan email isi
              res.send({ message: "Username and email is already used!" });
            }
          }
        });
      }
    }
  });
};

exports.login = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  var query = `SELECT * FROM user WHERE username='${username}'`;

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(error);
    }
    if (rows.length > 0) {
      if (rows[0].password == md5(password)) {
        const username = rows[0].username;
        const token = jwt.sign({ username }, "jwtsecret", {
          expiresIn: 300,
        });
        req.session.user = rows;
        // console.log(req.session.user);
        res.json({ auth: true, token: token, result: rows });
      } else {
        res.json({ auth: false, message: "Wrong username or password!" });
      }
    } else {
      res.json({ auth: false, message: "Username not found!" });
    }
  });
};

exports.isLogin = function (req, res) {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.verifyJWT = function (req, res, next) {
  const token = req.headers("x-access-token");
  if (!token) {
    res.send("We need a token");
  } else {
    jwt.verify(token, "sekut", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Authentication failed!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

exports.authtest = function (req, res) {
  res.send("You are authenticated");
};

// DORAYAKI
exports.showAllDorayaki = function (req, res) {
  connection.query("SELECT * FROM item", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
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
        res.json(rows);
      }
    }
  );
};

exports.addDorayaki = function (req, res) {
  var namaDorayaki = req.body.namaDorayaki;
  var query = `INSERT INTO item (nama) VALUES ('${namaDorayaki}')`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

// exports.showRequests = function (req, res) {
//   let id = req.params.id;
//   connection.query("SELECT * FROM requests", function (error, rows) {
//     if (error) {
//       console.log(error);
//     } else {
//       response.ok(rows, res);
//     }
//   });
// };

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

// RECEIPES
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

exports.addReceipe = function (req, res) {
  var idBahan = req.body.idBahan;
  var idItem = req.body.idItem;
  var jumlahBahan = req.body.jumlahBahan;
  var query = `INSERT INTO resep(idItem, idBahan, jumlahBahan) VALUES ('${idItem}', '${idBahan}', '${jumlahBahan}')`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

// INGREDIENTS
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

// REQUESTS
exports.showAllRequests = function (req, res) {
  var query = "SELECT * FROM request";
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.showPendingRequests = function (req, res) {
  var query = "SELECT * FROM request WHERE status = 'PENDING'";
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.showRequestById = function (req, res) {
  var idRequest = req.params.id;
  var query = `SELECT * FROM request WHERE idRequest = '${idRequest}'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.setRequestToAcceptById = function (req, res) {
  var idRequest = req.params.id;
  var query = `UPDATE request SET status = 'ACCEPT' WHERE idRequest = ${idRequest} AND STATUS = 'PENDING'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.setRequestToDeclineById = function (req, res) {
  var idRequest = req.params.id;
  var query = `UPDATE request SET status = 'DECLINE' WHERE idRequest = ${idRequest} AND STATUS = 'PENDING'`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.addLogRequest = function (req, res) {
  // ip endpoint timestamp
  var ip = req.query.ip;
  var endpoint = req.query.endpoint;
  var timestamp = req.query.timestamp;
  var iditem = req.query.idItem;
  var quantity = req.query.quantity;
  var username = req.query.username;

  var query = `INSERT INTO log_request(ip, endpoint, timestamp) VALUES ('${ip}', '${endpoint}', '${timestamp}')`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });

  var query2 = `INSERT INTO request(ip, username, idItem, quantity, timestamp) VALUES ('${ip}', '${username}', '${iditem}', '${quantity}', ${timestamp})`;
  query2 = mysql.format(query2);
  connection.query(query2, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};