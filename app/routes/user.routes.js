const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");

const controller = require("../controllers/user.controller");

router.get(
  "/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.getAllUsers
);

router.post(
  "/assign/:creatorId/:userId/project/:projectId",
  [authJwt.isProjectOwner, authJwt.verifyToken],
  controller.addProject
);

router.put("/update/:userId", [authJwt.verifyToken], controller.updateUser);

router.delete("/delete/:userId", [authJwt.verifyToken], controller.deleteUser);

router.post("/forgotpassword", controller.forgotPassword);

router.post("/updatepassword", controller.updatePassword);

// router.get("/:userId/project", authJwt.verifyToken, controller.getProjectByUserId);
router.get("/:userId/project", controller.getProjectByUserId);

module.exports = router;
