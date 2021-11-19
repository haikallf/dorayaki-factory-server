const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Parse app/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log(`Server started on port`);
});
