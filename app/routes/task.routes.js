const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");

router.post("/", authJwt.verifyToken, controller.createTask);

router.patch("/:id", authJwt.verifyToken, controller.updateTask);

module.exports = router;
