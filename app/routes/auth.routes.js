const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

module.exports = router;
