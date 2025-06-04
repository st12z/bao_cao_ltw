"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var dbConnect = require("./db/dbConnect");

var UserRouter = require("./routes/UserRouter");

var PhotoRouter = require("./routes/PhotoRouter");

var CommentRouter = require("./routes/CommentRouter");

var verifyToken = require("./middlewares");

var path = require("path");

dbConnect();
app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", verifyToken, PhotoRouter);
app.use("/api/comment", verifyToken, CommentRouter);
app.get("/", function (request, response) {
  response.send({
    message: "Hello from photo-sharing app API!"
  });
});
app.use("/images", express["static"](path.join(__dirname, "public/images")));
app.listen(8081, function () {
  console.log("server listening on port 8081");
});