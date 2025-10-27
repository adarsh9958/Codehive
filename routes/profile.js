const express = require("express");
const router = express.Router();
// const {validatePost,isLoggedIn,isOwner}=require("../middlewares");
const controllers = require("../controllers/profile");
const User = require("../models/users");
const Post = require("../models/posts");
const { isLoggedIn } = require("../middlewares");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const asyncWrapper = require("../utility/asyncWrapper");


// Get
router.get("/profile/:username", isLoggedIn,controllers.userProfile );

// Add followers and following or remvoe
router.patch("/profile/:id",isLoggedIn,controllers.addRemovefollow);

// Get Followings
router.get("/profile/:username/following",isLoggedIn,controllers.getFollowings);

// Get Followers
router.get("/profile/:username/follower",isLoggedIn, controllers.getFollowers);

router.get("/profile/:username/edit",isLoggedIn, controllers.renderUpdateForm);

router.put("/profile/:userId",isLoggedIn,upload.single("user[image]"),controllers.updateUserProfile)


module.exports = router;
