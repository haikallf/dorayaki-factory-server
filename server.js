const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Parse app/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// call routes
var routes = require("./routes");
routes(app);

app.listen(3001, () => {
  console.log(`Server started on port`);
});
