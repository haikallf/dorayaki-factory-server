var mysql = require("mysql2");

// connect to db

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "haikallf17",
//   database: "pabrik",
// });

const conn = mysql.createConnection({
  host: "bhavz3m9joyfao3xpk4a-mysql.services.clever-cloud.com",
  user: "ufkyenpyzvbthpgf",
  password: "5btw1OE7XAz1zbSEcQKe",
  database: "bhavz3m9joyfao3xpk4a",
});

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to pabrik");
  }
});

module.exports = conn;
