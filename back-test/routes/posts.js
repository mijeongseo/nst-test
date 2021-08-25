const express = require("express");
const { isLoggedIn } = require("./middlewares");

const { Image, User, Post } = require("../models");
const router = express.Router();

router.get("/", isLoggedIn, async (req, res, next) => {
  //get /posts

  try {
    if (req.user) {
      const posts = await Image.findAll({
        where: {},
        order: [["createdAt", "DESC"]],
        include: [{ model: Post, where: { UserId: req.user.id }, attributes: ["UserId"] }],
      });
      res.status(201).json(posts);
    } else {
      // res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
