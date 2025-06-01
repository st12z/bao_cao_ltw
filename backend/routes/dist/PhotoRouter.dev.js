"use strict";

var express = require("express");

var Photo = require("../db/photoModel");

var verifyToken = require("../middlewares");

var router = express.Router();

var upload = require("../middlewares/UploadPhoto"); // upload ảnh mới


router.post("/photos/new", verifyToken, upload.single("file"), function _callee(request, response) {
  var file, photo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          file = request.file;
          console.log("file", file);

          if (file) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            code: 400,
            message: "Không có file nào được tải lên"
          }));

        case 5:
          photo = new Photo({
            file_name: file.filename,
            user_id: request.body.userId,
            date_time: new Date(),
            comments: []
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(photo.save());

        case 8:
          response.status(200).json({
            code: 200,
            message: "Upload ảnh thành công",
            data: photo
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          response.status(500).json({
            code: 500,
            message: "Lỗi upload ảnh"
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // lấy danh sách ảnh của người dùng

router.get("/photosOfUser/:id", verifyToken, function _callee2(request, response) {
  var id, photos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = request.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Photo.find({
            user_id: id
          }));

        case 4:
          _context2.t0 = _context2.sent;

          if (_context2.t0) {
            _context2.next = 7;
            break;
          }

          _context2.t0 = [];

        case 7:
          photos = _context2.t0;

          if (photos.length > 0) {
            photos.forEach(function (photo) {
              if (photo.comments.length > 0) {
                photo.comments = photo.comments.sort(function (a, b) {
                  return new Date(b.date_time) - new Date(a.date_time);
                });
              }
            });
          }

          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: photos
          });
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t1 = _context2["catch"](0);
          console.error(_context2.t1);
          response.status(400).json({
            code: 400,
            message: "Lỗi id không hợp lệ"
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // đếm số lượng ảnh của người dùng

router.get("/countPhotosOfUser/:id", verifyToken, function _callee3(request, response) {
  var id, count;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = request.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Photo.countDocuments({
            user_id: id
          }));

        case 4:
          count = _context3.sent;
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: count
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          response.status(400).json({
            code: 400,
            message: "Lỗi id không hợp lệ"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Lấy ảnh theo id

router.get("/:id", verifyToken, function _callee4(request, response) {
  var id, photo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = request.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Photo.findOne({
            _id: id
          }));

        case 4:
          photo = _context4.sent;
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: photo
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