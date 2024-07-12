const express = require("express");
const asyncWrap = require("../utils/asyncWrap");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware/middleware");

router.post("/signup", asyncWrap(userController.signUp));
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local"),
  asyncWrap(userController.login)
);
router.post("/logout", userController.logOut);
router.get("/user", asyncWrap(userController.getUserData));

module.exports = router;
