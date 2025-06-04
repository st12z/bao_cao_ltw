const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); // đúng thư mục ảnh backend
  },
  filename: function (req, file, cb) {
    const file_name = Date.now() + "_" + file.originalname;
    cb(null, file_name);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
