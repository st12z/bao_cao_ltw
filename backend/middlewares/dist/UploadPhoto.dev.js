"use strict";

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); // đúng thư mục ảnh backend
  },
  filename: function filename(req, file, cb) {
    var file_name = Date.now() + "_" + file.originalname;
    cb(null, file_name);
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;