"use strict";

var express = require("express");

var Photo = require("../db/photoModel");

var verifyToken = require("../middlewares");

var router = express.Router(); // đếm số lượng comment của 1 người dùng

router.get("/countCommentsOfUser/:id", verifyToken, function _callee(request, response) {
  var id, photos, amount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, photo, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, comment;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = request.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(Photo.find());

        case 4:
          photos = _context.sent;
          amount = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 9;
          _iterator = photos[Symbol.iterator]();

        case 11:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 35;
            break;
          }

          photo = _step.value;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 16;

          for (_iterator2 = photo.comments[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            comment = _step2.value;
            if (comment.user_id == id) amount += 1;
          }

          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](16);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError2) {
            _context.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
          _iteratorNormalCompletion = true;
          _context.next = 11;
          break;

        case 35:
          _context.next = 41;
          break;

        case 37:
          _context.prev = 37;
          _context.t1 = _context["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 41:
          _context.prev = 41;
          _context.prev = 42;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 44:
          _context.prev = 44;

          if (!_didIteratorError) {
            _context.next = 47;
            break;
          }

          throw _iteratorError;

        case 47:
          return _context.finish(44);

        case 48:
          return _context.finish(41);

        case 49:
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: amount
          });
          _context.next = 56;
          break;

        case 52:
          _context.prev = 52;
          _context.t2 = _context["catch"](0);
          console.error(_context.t2);
          response.status(400).json({
            code: 400,
            message: "Lỗi id không hợp lệ"
          });

        case 56:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 52], [9, 37, 41, 49], [16, 20, 24, 32], [25,, 27, 31], [42,, 44, 48]]);
}); // lây danh sách bình luận của 1 người dùng

router.get("/commentsOfUser/:id", verifyToken, function _callee2(request, response) {
  var id, photos, amount, data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, photo, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, comment;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = request.params.id;
          console.log(id);
          _context2.next = 5;
          return regeneratorRuntime.awrap(Photo.find());

        case 5:
          photos = _context2.sent;
          amount = 0;
          data = [];
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context2.prev = 11;
          _iterator3 = photos[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context2.next = 37;
            break;
          }

          photo = _step3.value;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context2.prev = 18;

          for (_iterator4 = photo.comments[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            comment = _step4.value;

            if (comment.user_id == id) {
              data.push({
                _id: comment._id,
                photo_id: photo._id,
                file_name: photo.file_name,
                date_time: comment.date_time,
                comment: comment.comment
              });
            }
          }

          _context2.next = 26;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](18);
          _didIteratorError4 = true;
          _iteratorError4 = _context2.t0;

        case 26:
          _context2.prev = 26;
          _context2.prev = 27;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 29:
          _context2.prev = 29;

          if (!_didIteratorError4) {
            _context2.next = 32;
            break;
          }

          throw _iteratorError4;

        case 32:
          return _context2.finish(29);

        case 33:
          return _context2.finish(26);

        case 34:
          _iteratorNormalCompletion3 = true;
          _context2.next = 13;
          break;

        case 37:
          _context2.next = 43;
          break;

        case 39:
          _context2.prev = 39;
          _context2.t1 = _context2["catch"](11);
          _didIteratorError3 = true;
          _iteratorError3 = _context2.t1;

        case 43:
          _context2.prev = 43;
          _context2.prev = 44;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 46:
          _context2.prev = 46;

          if (!_didIteratorError3) {
            _context2.next = 49;
            break;
          }

          throw _iteratorError3;

        case 49:
          return _context2.finish(46);

        case 50:
          return _context2.finish(43);

        case 51:
          data.sort(function (a, b) {
            return new Date(b.date_time) - new Date(a.date_time);
          });
          response.status(200).json({
            code: 200,
            message: "Truy vấn thành công",
            data: data
          });
          _context2.next = 59;
          break;

        case 55:
          _context2.prev = 55;
          _context2.t2 = _context2["catch"](0);
          console.error(_context2.t2);
          response.status(400).json({
            code: 500,
            message: "Lỗi server"
          });

        case 59:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 55], [11, 39, 43, 51], [18, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
}); // thêm bình luận vào ảnh

router.post("/commentsOfPhoto/:photo_id", verifyToken, function _callee3(request, response) {
  var photoId, _request$body, userId, comment, photo;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log("request.body", request.body);
          photoId = request.params.photo_id;
          _request$body = request.body, userId = _request$body.userId, comment = _request$body.comment;

          if (!(!photoId || !userId || !comment)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", response.status(400).json({
            code: 400,
            message: "Thiếu thông tin cần thiết"
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Photo.findOne({
            _id: photoId
          }));

        case 8:
          photo = _context3.sent;

          if (photo) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", response.status(404).json({
            code: 404,
            message: "Ảnh không tồn tại"
          }));

        case 11:
          photo.comments.push({
            user_id: userId,
            comment: comment,
            date_time: new Date()
          });
          console.log(photo);
          _context3.next = 15;
          return regeneratorRuntime.awrap(photo.save());

        case 15:
          photo.comments.sort(function (a, b) {
            return new Date(b.date_time) - new Date(a.date_time);
          });
          response.status(200).json({
            code: 200,
            message: "Bình luận đã được thêm thành công",
            data: photo
          });
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          response.status(500).json({
            code: 500,
            message: "Lỗi server"
          });

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
module.exports = router;