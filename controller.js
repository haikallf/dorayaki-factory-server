"use strict";

var response = require("./res");
var connection = require("./connect");
var mysql = require("mysql2");
// var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const saltRounds = 10;
var md5 = require("md5");
var jwt = require("jsonwebtoken");
const e = require("express");

exports.index = function (req, res) {
  response.ok("REST App Working", res);
};

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

// AUTH
exports.registration = function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = md5(req.body.password);

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
              var query3 = `INSERT INTO user(username, email, password) VALUES ('${username}', '${email}', '${password}')`;
              query3 = mysql.format(query3);
              connection.query(query3, function (error, rows3) {
                if (error) {
                  console.log(error);
                } else {
                  // res.send(rows3);
                  res.send({ success: "Registration success!" });
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
          expiresIn: 60 * 60 * 24,
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

// exports.authtest = function (req, res) {
//   res.send("You are authenticated");
// };

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
  var query = "SELECT * FROM request WHERE status = 0";
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
  var query = `UPDATE request SET status = 1 WHERE idRequest = ${idRequest} AND STATUS = 0`;
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
  var query = `UPDATE request SET status = -1 WHERE idRequest = ${idRequest} AND STATUS = 0`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.json(rows);
    }
  });
};

exports.addRequest = function (req, res) {
  // ip endpoint timestamp
  // var ip = req.body.ip;
  // var endpoint = req.body.endpoint;
  var timestamp = req.body.timestamp;
  var iditem = req.body.idItem;
  var quantity = req.body.quantity;
  var username = req.body.username;

  var query = `INSERT INTO request(username, idItem, quantity, timestamp) VALUES ('${username}', ${iditem}, ${quantity}, '${timestamp}')`;
  query = mysql.format(query);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      transporter.sendMail(emailDetails);
      res.send({ message: "Success!" });
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

// // EMAIL
// exports.sendMail = function (req, res) {
//   transporter.sendMail(emailDetails, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(info.response);
//     }
//   });
// };

exports.validateRequest = function (req, res) {
  var idRequest = req.body.idRequest;
  // var query = `SELECT idRequest, rq.idItem, quantity, rs.idBahan, jumlahBahan, stokBahan FROM request rq INNER JOIN resep rp ON rs.idItem = rq.idItem INNER JOIN bahan_baku b ON rs.idBahan = b.idBahan WHERE rq.idRequest = ${idRequest}`;
  var query = `SELECT idRequest, idItem, quantity, idBahan, jumlahBahan, stokBahan FROM request NATURAL JOIN resep NATURAL JOIN bahan_baku WHERE idRequest = ${idRequest}`;
  connection.query(query, function (error, reqData) {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      // res.send({ reqData: reqData });
      let count = 0;

      for (let i = 0; i < reqData.length; i++) {
        if (
          reqData[i].jumlahBahan * reqData[i].quantity <=
          reqData[i].stokBahan
        ) {
          count++;
        }
      }

      if (count == reqData.length) {
        for (let i = 0; i < reqData.length; i++) {
          var query = `UPDATE bahan_baku SET stokBahan = stokbahan - ${
            reqData[i].jumlahBahan * reqData[i].quantity
          } WHERE idBahan = ${reqData[i].idBahan}`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            }
          });
        }
        res.send({ success: "Done" });
      } else {
        res.send({ message: "Gagal" });
      }
    }
  });
};

// exports.validateRequest = function (req, res) {
//   var idRequest = req.body.idRequest;
//   // var query = `SELECT idRequest, rq.idItem, quantity, rs.idBahan, jumlahBahan, stokBahan FROM request rq INNER JOIN resep rp ON rs.idItem = rq.idItem INNER JOIN bahan_baku b ON rs.idBahan = b.idBahan WHERE rq.idRequest = ${idRequest}`;
//   var reqData = getAllRecordsForRequestByIdRequest(idRequest);

//   let count = 0;

//   for (let i = 0; i < reqData.length; i++) {
//     if (
//       reqData[i].jumlahBahan * reqData[i].jumlahBahan <=
//       reqData[i].stokBahan
//     ) {
//       count++;
//     }
//   }

//   if (count == reqData.length) {
//     res.send({ success: "Bisa di acc" });
//   }
// };

// exports.validateRequest = function (req, res) {
//   var idRequest = req.body.idRequest;

//   var rows = getRequestById(idRequest);

//   var rows2 = getResepById(rows[0].idRequest);

//   var accept = false;
//   let count = 0;
//   for (let i = 0; i < rows2.length; i++) {
//     if (
//       rows2[i].idBahan == findBahanById(rows2[i].idBahan).idBahan &&
//       rows2[i].jumlahBahan * rows.quantity <=
//         findBahanById(rows2[i].idBahan).stokBahan
//     ) {
//       count++;
//     } else {
//       count += 0;
//     }
//   }

//   if (count == rows2.length) {
//     accept = true;
//   } else {
//     res.send({ message: "Ada jumlah bahan yang kurang!" });
//   }

//   if (accept) {
//     for (let i = 0; i < rows2.length; i++) {
//       reduceStokBahanById(rows2[i].idBahan, rows2[i].jumlahBahan);
//     }
//     res.send({ success: "Stok bahan berhasil di-update!" });
//   }

//   // for (let i = 0; i < rows2.length; i++) {
//   //   if (rows2[i].idBahan == findBahanById(rows2[i].idBahan).idBahan){
//   //     if (rows2[i].idBahan == findBahanById(rows2[i].idBahan).idBahan)
//   //   }
//   // }
// };

// const findBahanById = (id) => {
//   var query = `SELECT * FROM bahan_baku WHERE idBahan = ${id}`;
//   connection.query(query, function (error, rows) {
//     if (error) {
//       console.log(error);
//       return {};
//     } else {
//       return rows;
//     }
//   });
// };

// const reduceStokBahanById = (id, jumlahBahan) => {
//   var query = `UPDATE bahan_baku SET stokBahan = stokbahan - ${jumlahBahan} WHERE idBahan = ${id}`;
//   connection.query(query, function (error, rows) {
//     if (error) {
//       console.log(error);
//       return {};
//     } else {
//       return rows;
//     }
//   });
// };

// const getRequestById = async (idRequest) => {
//   var query = `SELECT * FROM request WHERE status = 'PENDING' AND idRequest = ${idRequest}`;
//   connection.query(query, function (error, rows) {
//     if (error) {
//       return {};
//     } else {
//       console.log(rows);
//       return rows;
//     }
//   });
// };

// const getResepById = (idItem) => {
//   var query = `SELECT * FROM resep WHERE idItem = ${idItem}`;
//   connection.query(query, function (error, rows) {
//     if (error) {
//       return {};
//     } else {
//       return rows;
//     }
//   });
// };

// const getAllRecordsForRequestByIdRequest = (idRequest) => {
//   var idRequest = req.body.idRequest;
//   var query = `SELECT idRequest, idItem, quantity, idBahan, jumlahBahan, stokBahan FROM request NATURAL JOIN resep NATURAL JOIN bahan_baku WHERE idRequest = ${idRequest}`;
//   connection.query(query, function (error, reqData) {
//     if (error) {
//       console.log(error);
//       return [];
//     } else {
//       let count = 0;

//       for (let i = 0; i < reqData.length; i++) {
//         if (
//           reqData[i].jumlahBahan * reqData[i].jumlahBahan <=
//           reqData[i].stokBahan
//         ) {
//           count++;
//         }
//       }

//       if (count == reqData.length) {
//         res.send({ success: "Bisa di acc" });
//         for (let i = 0; i < reqData.length; i++) {
//           var query = `UPDATE bahan_baku SET stokBahan = stokbahan - ${
//             reqData[i].jumlahBahan * reqData[i].quantity
//           } WHERE idBahan = ${reqData[i].idBahan}`;
//           connection.query(query, function (error, rows) {
//             if (error) {
//               console.log(error);
//               return {};
//             } else {
//               return rows;
//             }
//           });
//         }
//       }
//     }
//   });
// };
