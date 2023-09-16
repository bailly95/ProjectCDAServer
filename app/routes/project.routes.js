const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");

router.get(
  "/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.getAllProjects
);

router.post("/", authJwt.verifyToken, controller.createProject);

router.post("/", controller.createProject);

module.exports = router;
