"use strict";

var jwt = require("jsonwebtoken");

var dotenv = require("dotenv");

dotenv.config();

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "No token provided"
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({
        code: 403,
        message: "Failed to authenticate token"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;