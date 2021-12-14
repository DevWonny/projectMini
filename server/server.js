require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");
const { auth } = require("./middleware/auth");

const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connectd.");
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(auth);
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT, () => {
      console.log(`${PORT}로 서버 실행중...`);
    });
  })
  .catch((e) => console.log(e));
