const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const CommentRouter=require("./routes/CommentRouter");
const verifyToken = require("./middlewares");
const path = require("path");
dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo",verifyToken, PhotoRouter);
app.use("/api/comment",verifyToken, CommentRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});
app.use('/images', express.static(path.join(__dirname, '../FrontEnd_LTW/src/images')));
app.listen(8081, () => {
  console.log("server listening on port 8081");
});
