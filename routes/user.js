const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const express = require("express");
const asyncWrapper = require("../utility/asyncWrapper");
const router = express.Router();
const controllers = require("../controllers/user");

router
  .route("/register")
  .get(controllers.renderSignUpForm)
  .post(upload.single("user[image]"), controllers.signUpUser);

router
  .route("/login")
  .get(controllers.renderLoginForm)
  .post(controllers.loginUser);

router.post("/logout", controllers.logoutUser);

module.exports = router;
