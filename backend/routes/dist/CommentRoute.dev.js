"use strict";

var express = require("express");

var Photo = require("../db/photoModel");

var router = express.Router();
router.get("/photosOfUser/:id", function _callee(request, response) {
  var id, photos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = request.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(Photo.find({
            user_id: id
          }));

        case 4:
          photos = _context.sent;
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: photos
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          response.status(400).json({
            code: 400,
            message: "Lỗi id không hợp lệ"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;