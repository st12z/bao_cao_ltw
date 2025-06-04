"use strict";

var express = require("express");

var User = require("../db/userModel");

var router = express.Router();

var jwt = require("jsonwebtoken");

var dotenv = require("dotenv");

var verifyToken = require("../middlewares/index");

dotenv.config();
var secretKey = process.env.SECRET_KEY;
router.post("", function _callee(request, response) {
  var existUser, _request$body, first_name, last_name, location, description, occupation, username, password, newUser, userResponse;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("request.body", request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: request.body.username
          }));

        case 4:
          existUser = _context.sent;

          if (!existUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            code: 400,
            message: "Username đã tồn tại"
          }));

        case 7:
          _request$body = request.body, first_name = _request$body.first_name, last_name = _request$body.last_name, location = _request$body.location, description = _request$body.description, occupation = _request$body.occupation, username = _request$body.username, password = _request$body.password;
          newUser = new User({
            first_name: first_name,
            last_name: last_name,
            location: location,
            description: description,
            occupation: occupation,
            username: username,
            password: password
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(newUser.save());

        case 11:
          userResponse = {
            _id: newUser._id,
            username: newUser.username,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            location: newUser.location,
            description: newUser.description,
            occupation: newUser.occupation
          };
          response.status(200).json({
            code: 200,
            message: "Tạo người dùng thành công",
            data: userResponse
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          response.status(400).json({
            code: 400,
            message: "Lỗi tạo người dùng"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get("/list", verifyToken, function _callee2(request, response) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("request.query", request.query);
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.find().select("_id first_name last_name"));

        case 4:
          users = _context2.sent;
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: users
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          response.status(500).json({
            code: 500,
            message: "Lỗi truy vấn danh sách người dùng"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post("/login", function _callee3(request, response) {
  var _request$body2, username, password, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _request$body2 = request.body, username = _request$body2.username, password = _request$body2.password;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: username,
            password: password
          }).select("_id first_name last_name location description occupation"));

        case 4:
          user = _context3.sent;
          console.log("user", user);

          if (user) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", response.status(400).json({
            code: 400,
            message: "Tài khoản hoặc mật khẩu không đúng"
          }));

        case 8:
          jwt.sign({
            user: user
          }, secretKey, {
            expiresIn: "1h"
          }, function (err, token) {
            if (err) {
              console.error(err);
              return response.status(500).json({
                code: 500,
                message: "Lỗi tạo token"
              });
            }

            response.status(200).json({
              code: 200,
              message: "Đăng nhập thành công",
              data: {
                user: user,
                token: token
              }
            });
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          response.status(500).json({
            code: 500,
            message: "Lỗi đăng nhập"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
router.get("/:id", verifyToken, function _callee4(request, response) {
  var id, users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = request.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            _id: id
          }).select("_id first_name last_name location description occupation"));

        case 4:
          users = _context4.sent;
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: users
          });
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          response.status(400).json({
            code: 400,
            message: "Lỗi id không hợp lệ"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;