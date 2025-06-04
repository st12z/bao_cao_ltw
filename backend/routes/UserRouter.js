const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("../middlewares/index");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
router.post("", async (request, response) => {
  try {
    console.log("request.body", request.body);
    const existUser = await User.findOne({
      username: request.body.username,
    });
    if (existUser) {
      return response.status(400).json({
        code: 400,
        message: "Username đã tồn tại",
      });
    }
    const {
      first_name,
      last_name,
      location,
      description,
      occupation,
      username,
      password,
    } = request.body;
    const newUser = new User({
      first_name,
      last_name,
      location,
      description,
      occupation,
      username,
      password,
    });
    await newUser.save();
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      location: newUser.location,
      description: newUser.description,
      occupation: newUser.occupation,
    };
    response.status(200).json({
      code: 200,
      message: "Tạo người dùng thành công",
      data: userResponse,
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      code: 400,
      message: "Lỗi tạo người dùng",
    });
  }
});

router.get("/list", verifyToken, async (request, response) => {
  try {
    console.log("request.query", request.query);
    const users = await User.find().select("_id first_name last_name");
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      code: 500,
      message: "Lỗi truy vấn danh sách người dùng",
    });
  }
});
router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({
      username: username,
      password: password,
    }).select("_id first_name last_name location description occupation");
    console.log("user", user);
    if (!user) {
      return response.status(400).json({
        code: 400,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
    jwt.sign({ user }, secretKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err);
        return response.status(500).json({
          code: 500,
          message: "Lỗi tạo token",
        });
      }
      response.status(200).json({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          user,
          token,
        },
      });
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      code: 500,
      message: "Lỗi đăng nhập",
    });
  }
});
router.get("/:id", verifyToken, async (request, response) => {
  try {
    const id = request.params.id;
    const users = await User.findOne({ _id: id }).select(
      "_id first_name last_name location description occupation"
    );
    response.status(200).json({
      code: 200,
      message: "Truy vấn thành công",
      data: users,
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
