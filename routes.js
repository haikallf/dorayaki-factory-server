"use strict";

// Get varian yang disediain sama factory
// Call ke soap client, trus ngehit rest api yang ada di backend

// Udah dapet varian, trus req
// Manggil operation buat ngirim req, trus soapnya ngehit rest apinya buat bikin req baru

// Ngecek apakah requestnya udah di approve atau belum sama admin factory
// CRON job untuk berapa jam sekali untuk minta status request, minta ke sop, soap ke backend pake get, si soapnya balikin lagi ke toko si toko update stok di dbnya

// Si tokonya minta ke soap, dicek udah limit atau belum, kalau udah, return error

module.exports = function (app) {
  var myjson = require("./controller");

  // var verification = require("./middleware/verification");
  const { validateToken } = require("./middleware/AuthMiddleware");
  // var auth = require("./auth");

  app.route("/").get(myjson.index);

  // app.route("/login").get(myjson.isLogin);
  app.route("/login").post(myjson.login);
  app.route("/register").post(myjson.registration);
  // app.route("/authtest").get(myjson.authtest);

  app.route("/dorayaki").get(myjson.showAllDorayaki);
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
  app.route("/tambahrequest").post(myjson.addRequest);
  app.route("/acceptrequest").post(myjson.validateRequest);

  app
    .route("/request/:ip?:enpoint?:timestamp?:iditem?:quantity:?:username?")
    .get(myjson.addLogRequest);

  app.route("/mail").get(myjson.sendMail);
};
