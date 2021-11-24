const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const session = require("express-session");
const app = express();
var connection = require("./connect");
var md5 = require("md5");
var jwt = require("jsonwebtoken");

// Parse app/json
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  session({
    key: "userId",
    secret: "sekut",
    resave: "false",
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// call routes
var routes = require("./routes");
routes(app);

// assign routes from index (middleware)
// app.use("/auth", require("./middleware"));

app.listen(3001, () => {
  console.log(`Server started on port`);
});

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   var query = `SELECT * FROM user WHERE username='${username}'`;

//   connection.query(query, function (err, rows) {
//     if (err) {
//       console.log(error);
//     }
//     if (rows.length > 0) {
//       if (rows[0].password == md5(password)) {
//         const username = rows[0].username;
//         const token = jwt.sign({ username }, "jwtsecret", {
//           expiresIn: 300,
//         });
//         req.session.user = rows;
//         console.log(req.session.user);
//         res.json({ auth: true, token: token, result: rows[0] });
//       } else {
//         res.send({ message: "Wrong username or password!" });
//       }
//     } else {
//       res.send({ message: "Username not found!" });
//     }
//   });
// });

// app.get("/isUserAuth", verifyJWT, (req, res) => {
//   res.send("U are authenticated");
// });
