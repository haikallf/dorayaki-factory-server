const express = require("express");
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  console.log(req.headers["authorization"]);
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    res.json({ error: "User not logged in!" });
    // return next();
  } else {
    try {
      const validToken = verify(accessToken, "jwtsecret");
      if (validToken) {
        return next();
      }
    } catch (err) {
      return res.json({ error: err });
    }
  }
};

module.exports = { validateToken };
