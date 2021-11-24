"use strict";

module.exports = function (app) {
  var myjson = require("./controller");

  // var verification = require("./middleware/verification");
  // var auth = require("./auth");

  app.route("/").get(myjson.index);

  app.route("/login").get(myjson.isLogin);
  app.route("/login").post(myjson.login);
  app.route("/register").post(myjson.registration);
  app.route("/authtest", myjson.verifyJWT).get(myjson.authtest);

  app.route("/dorayaki", myjson.verifyJWT).get(myjson.showAllDorayaki);
  app.route("/tambahdorayaki").post(myjson.addDorayaki);
  app.route("/dorayaki/:id").get(myjson.showDorayakiDetailById);

  app.route("/resep").get(myjson.showAllReceipe);
  app.route("/tambahresep").post(myjson.addReceipe);

  app.route("/bahan").get(myjson.showAllIngredients);
  app.route("/tambahbahan").post(myjson.addIngredients);
  app.route("/getbahan/:id").get(myjson.showIngredientDetailsById);
  app.route("/bahan/:id/edit").put(myjson.editIngredients);

  app.route("/request").get(myjson.showAllRequests);
  app.route("/request/pending").get(myjson.showPendingRequests);
  app.route("/request/:id").get(myjson.showRequestById);
  app.route("/request/:id/accept").post(myjson.setRequestToAcceptById);
  app.route("/request/:id/decline").post(myjson.setRequestToDeclineById);
  app.route("/request").get(myjson.setRequestToDeclineById);

  app.route("/mail").get(myjson.sendMail);
};
