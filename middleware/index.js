var express = require("express");
var auth = require("./auth");
var router = express.Router();
var verification = require("./verification");

router.post("/api/v1/register", auth.registration);
router.post("/api/v1/login", auth.login);

router.get("/api/v1/requests", verification(), auth.requestPage);

module.exports = router;
