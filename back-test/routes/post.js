const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isLoggedIn } = require("./middlewares");

const { Image, User, Post } = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (err) {
  // console.log('uploads폴더가 없으므로 생성하기');
  fs.mkdirSync("uploads");
}

const upload = multer({
  //저장위치
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);

      done(null, basename + "_" + new Date().getTime() + ext);
    },
    limits: { fileSize: 20 * 1014 * 1024 }, //20MB (파일크기제한)
  }),
});

router.post("/images", isLoggedIn, upload.array("image"), async (req, res, next) => {
  //POST /post/images
  try {
    res.json(req.files.map((v) => v.filename));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  //POST /post
  try {
    const post = await Post.create({
      UserId: req.user.id,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((img) => Image.create({ src: img })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Image.findAll({
      where: {},
      order: [["createdAt", "DESC"]],
      include: [{ model: Post, where: { id: post.id }, attributes: ["UserId"] }],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
