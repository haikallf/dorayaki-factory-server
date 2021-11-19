var mysql = require("mysql2");

// connect to db

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "haikallf17",
  database: "pabrik",
});

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to pabrik");
  }
});

module.exports = conn;
