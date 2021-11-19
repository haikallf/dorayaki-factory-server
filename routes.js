"use strict";

module.exports = function (app) {
  var myjson = require("./controller");

  app.route("/").get(myjson.index);

  app.route("/dorayaki").get(myjson.showAllDorayaki);

  app.route("/dorayaki/:id").get(myjson.showDorayakiDetailById);
};