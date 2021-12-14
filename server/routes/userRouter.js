const { Router } = require("express");
const userRouter = Router();
const User = require("../model/User");
const { hash, compare } = require("bcryptjs");
const Image = require("../model/Image");

userRouter.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await new User({
      userId: req.body.userId,
      username: req.body.username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }],
    }).save();

    const session = user.sessions[0];
    res.json({
      message: "user register",
      sessionId: session._id,
      username: user.username,
      userId: user.userId,
      _id: user._id,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    if (!user) throw new Error("아이디 및 비밀번호 정보가 올바르지 않습니다.");
    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid)
      throw new Error("아이디 및 비밀번호 정보가 올바르지 않습니다.");

    user.sessions.push({ createdAt: new Date() });
    const session = user.sessions[user.sessions.length - 1];
    user.save();

    res.json({
      message: "login success",
      sessionId: session._id,
      username: user.username,
      userId: user.userId,
      _id: user._id,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    if (!req.user) throw new Error("sessionid가 틀립니다!");
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: req.headers.sessionid } } }
    );
    res.json({ message: "user logout!" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

userRouter.get("/me", (req, res) => {
  try {
    if (!req.user) throw new Error("권한 없음");
    res.json({
      message: "success!",
      sessionId: req.headers.sessionid,
      username: req.user.username,
      userId: req.user.userId,
      _id: req.user._id,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

userRouter.get("/me/images", async (req, res) => {
  try {
    if (!req.user) throw new Error("권한 없음!!!");
    const images = await Image.find({ "user._id": req.user.id });
    res.json(images);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
})

module.exports = { userRouter };
