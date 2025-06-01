"use strict";

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../FrontEnd_LTW/src/images")); // Lưu trong backend/public/images
  },
  filename: function filename(req, file, cb) {
    var file_name = Date.now() + "_" + file.originalname;
    cb(null, file_name); // Tên duy nhất
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;