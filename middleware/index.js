var express = require("express");
var auth = require("./auth");
var controller = require("../controller");
var router = express.Router();
var verification = require("./verification");

router.post("/register", auth.registration);
router.post("/login", auth.login);

router.get("/requests", verification(), auth.requestPage);

module.exports = router;
