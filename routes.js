"use strict";

module.exports = function (app) {
  var myjson = require("./controller");
  var verification = require("./middleware/verification");

  app.route("/").get(myjson.index);

  app.route("/resep").get(myjson.showAllReceipe);

  app.route("/bahan").get(myjson.showAllIngredients);

  app.route("/tambahbahan").post(myjson.addIngredients);

  app.route("/bahan/:id").put(myjson.editIngredients);

  app.route("/dorayaki").get(myjson.showAllDorayaki);

  app.route("/dorayaki/:id").get(myjson.showDorayakiDetailById);
};
