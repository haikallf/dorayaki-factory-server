exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
  var table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });

        id_user = rows[0].id;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT tergenerate!",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email atau password salah!" });
      }
    }
  });
};
