"use strict";

module.exports = function (app) {
  var myjson = require("./controller");
  var verification = require("./middleware/verification");

  app.route("/").get(myjson.index);

  app.route("/dorayaki").get(myjson.showAllDorayaki);

  app.route("/dorayaki/:id").get(myjson.showDorayakiDetailById);

  app.route("/resep").get(myjson.showAllReceipe);

  app.route("/tambahresep").post(myjson.addReceipe);

  app.route("/bahan").get(myjson.showAllIngredients);

  app.route("/tambahbahan").post(myjson.addIngredients);

  app.route("/bahan/:id").get(myjson.showIngredientDetailsById);

  app.route("/bahan/:id/edit").put(myjson.editIngredients);

  app.route("/request").get(myjson.showAllRequests);

  app.route("/request/pending").get(myjson.showPendingRequests);

  app.route("/request/:id").get(myjson.showRequestById);

  app.route("/request/:id/accept").post(myjson.setRequestToAcceptById);

  app.route("/request/:id/decline").post(myjson.setRequestToDeclineById);

  app.route("/request").get(myjson.setRequestToDeclineById);

  app.route("/mail").get(myjson.sendMail);
};
