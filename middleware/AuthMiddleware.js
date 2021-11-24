const e = require("express");
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  console.log(req.headers["Authorization"]);
  const accessToken = req.headers["Authorization"];

  if (!accessToken) {
    res.json({ error: "User not logged in!" });
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
