const { Router } = require("express");
const imageRouter = Router();
const Image = require("../model/Image");
const { upload } = require("../middleware/imageUpload");
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");

const fileUnlink = promisify(fs.unlink);

imageRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.user) throw new Error("user 정보 없음!");
    const image = await new Image({
      user: {
        _id: req.user.id,
        username: req.user.username,
        userId: req.user.userId,
      },
      public: req.body.public,
      key: req.file.filename,
      originalFileName: req.file.originalname,
    }).save();
    res.json(image);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

// 전체사진 조회
// imageRouter.get("/", async (req, res) => {
//   const images = await Image.find({ public: false });
//   res.json(images);
// });

imageRouter.delete("/:imageId", async (req, res) => {
  // user 권환 확인
  // 사진 삭제 1.uploads 폴더에 있는 사진 데이터 삭제 2. DB에 있는 이미지 문서 삭제
  try {
    if (!req.user) throw new Error("권한 없음!!!!");
    if (!mongoose.isValidObjectId(req.params.imageId))
      throw new Error("올바르지 않은 이미지 id입니다.");
    
    const image = await Image.findOneAndDelete({ _id: req.params.imageId });
    if (!image) return res.json({ message: "요청하신 이미지는 이미 삭제됨!" });
    await fileUnlink(`./uploads/${image.key}`);
    res.json({ messeage: "요청하신 이미지 삭제 완료!" , image});
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

module.exports = { imageRouter };
