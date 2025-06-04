const express = require("express");
const Photo = require("../db/photoModel");
const verifyToken = require("../middlewares");
const router = express.Router();
const upload = require("../middlewares/UploadPhoto");
// upload ảnh mới
router.post(
  "/photos/new",
  verifyToken,
  upload.single("file"),
  async (request, response) => {
    try {
      const file = request.file;
      console.log("file", file);
      if (!file) {
        return response.status(400).json({
          code: 400,
          message: "Không có file nào được tải lên",
        });
      }
      const photo = new Photo({
        file_name: file.filename,
        user_id: request.body.userId,
        date_time: new Date(),
        comments: [],
      });
      await photo.save();
      response.status(200).json({
        code: 200,
        message: "Upload ảnh thành công",
        data: photo,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        code: 500,
        message: "Lỗi upload ảnh",
      });
    }
  }
);
// lấy danh sách ảnh của người dùng
router.get("/photosOfUser/:id", verifyToken, async (request, response) => {
  try {
    const id = request.params.id;
    const photos =
      (await Photo.find({ user_id: id }).sort({ date_time: -1 })) || [];
    if (photos.length > 0) {
      photos.forEach((photo) => {
        if (photo.comments.length > 0) {
          photo.comments.sort((a, b) => {
            return new Date(b.date_time) - new Date(a.date_time);
          });
        }
      });
    }
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: photos,
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      code: 400,
      message: "Lỗi id không hợp lệ",
    });
  }
});
// đếm số lượng ảnh của người dùng
router.get("/countPhotosOfUser/:id", verifyToken, async (request, response) => {
  try {
    const id = request.params.id;
    const count = await Photo.countDocuments({ user_id: id });
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: count,
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      code: 400,
      message: "Lỗi id không hợp lệ",
    });
  }
});
// Lấy ảnh theo id
router.get("/:id", verifyToken, async (request, response) => {
  try {
    const id = request.params.id;
    const photo = await Photo.findOne({ _id: id });
    if (photo.comments.length > 0) {
      photo.comments.sort((a, b) => {
        return new Date(b.date_time) - new Date(a.date_time);
      });
    }
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: photo,
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      code: 400,
      message: "Lỗi id không hợp lệ",
    });
  }
});
module.exports = router;
