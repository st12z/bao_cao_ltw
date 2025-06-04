const express = require("express");
const Photo = require("../db/photoModel");
const verifyToken = require("../middlewares");
const router = express.Router();
// đếm số lượng comment của 1 người dùng
router.get(
  "/countCommentsOfUser/:id",
  verifyToken,
  async (request, response) => {
    try {
      const id = request.params.id;
      const photos = await Photo.find();
      let amount = 0;
      for (const photo of photos) {
        for (const comment of photo.comments) {
          if (comment.user_id == id) amount += 1;
        }
      }
      response.status(200).json({
        code: 200,
        message: "Truy vấn thành công",
        data: amount,
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({
        code: 400,
        message: "Lỗi id không hợp lệ",
      });
    }
  }
);
// lây danh sách bình luận của 1 người dùng
router.get("/commentsOfUser/:id", verifyToken, async (request, response) => {
  try {
    const id = request.params.id;
    console.log(id);
    const photos = await Photo.find();
    let amount = 0;
    const data = [];
    for (const photo of photos) {
      for (const comment of photo.comments) {
        if (comment.user_id == id) {
          data.push({
            _id: comment._id,
            photo_id: photo._id,
            file_name: photo.file_name,
            date_time: comment.date_time,
            comment: comment.comment,
          });
        }
      }
    }
    data.sort((a, b) => {
      return new Date(b.date_time) - new Date(a.date_time);
    });
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: data,
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      code: 500,
      message: "Lỗi server",
    });
  }
});
// thêm bình luận vào ảnh
router.post(
  "/commentsOfPhoto/:photo_id",
  verifyToken,
  async (request, response) => {
    try {
      console.log("request.body", request.body);
      const photoId = request.params.photo_id;
      const { userId, comment } = request.body;
      if (!photoId || !userId || !comment) {
        return response.status(400).json({
          code: 400,
          message: "Thiếu thông tin cần thiết",
        });
      }
      const photo = await Photo.findOne({ _id: photoId });
      if (!photo) {
        return response.status(404).json({
          code: 404,
          message: "Ảnh không tồn tại",
        });
      }

      photo.comments.push({
        user_id: userId,
        comment: comment,
        date_time: new Date(),
      });
      console.log(photo);
      await photo.save();
      photo.comments.sort((a, b) => {
        return new Date(b.date_time) - new Date(a.date_time);
      });

      response.status(200).json({
        code: 200,
        message: "Bình luận đã được thêm thành công",
        data: photo,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        code: 500,
        message: "Lỗi server",
      });
    }
  }
);
module.exports = router;
