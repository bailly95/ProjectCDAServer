const express = require("express");
const router = express.Router();

const controller = require("../controllers/article.controller");

router.get(
  "/all",
  controller.getAllArticle
);

module.exports = router;
