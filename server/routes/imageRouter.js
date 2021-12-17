const { Router } = require("express");
const imageRouter = Router();
const Image = require("../model/Image");
const { upload } = require("../middleware/imageUpload");
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");

const fileUnlink = promisify(fs.unlink);

imageRouter.post("/", upload.array("image", 5), async (req, res) => {
  try {
    if (!req.user) throw new Error("user 정보 없음!");
    const images = await Promise.all(
      req.files.map(async (file) => {
        const image = await new Image({
          user: {
            _id: req.user.id,
            username: req.user.username,
            userId: req.user.userId,
          },
          public: req.body.public,
          key: file.filename,
          originalFileName: file.originalname,
        }).save();
        return image;
      })
    );
    res.json(images);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

// // 전체사진 조회
// imageRouter.get("/", async (req, res) => {
//   const images = await Image.find({ public: false });
//   res.json(images);
// });

imageRouter.get("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    if (!mongoose.isValidObjectId(imageId)) throw new Error("올바르지 않은 이미지ID 입니다!");
    const image = await Image.findOne({ _id: imageId });
    if (!image) throw new Error("해당 이미지가 존재하지 않습니다!");
    
    console.log(req.user);
    const reqTest = req.user._id;
    const imageTest = image.user._id;

    console.log(reqTest.toString());
    console.log(imageTest.toString());
    
    if (!req.user || reqTest.toString() !== imageTest.toString()) throw new Error("권한이 없습니다 - get /:imageId");
    res.json(image);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});


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
    res.json({ messeage: "요청하신 이미지 삭제 완료!", image });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

module.exports = { imageRouter };
