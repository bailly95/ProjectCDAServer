const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");

router.post("/add", authJwt.verifyToken, controller.createComment);

module.exports = router;
