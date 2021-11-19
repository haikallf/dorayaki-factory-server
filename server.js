const bodyParser = require("body-parser");
const express = require("express");

var morgan = require("morgan");
const app = express();

// Parse app/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// call routes
var routes = require("./routes");
routes(app);

// assign routes from index (middleware)
app.use("/auth", require("./middleware"));

app.listen(3001, () => {
  console.log(`Server started on port`);
});
