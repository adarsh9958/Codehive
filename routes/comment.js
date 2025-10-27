const express = require("express");
const router = express.Router();
const asyncWrapper = require("../utility/asyncWrapper");
const { validateComment, isLoggedIn,isAuthor } = require("../middlewares");
const controllers = require("../controllers/comment");

// Create Comment
router.post(
  "/posts/:id/comment",
  isLoggedIn,
  validateComment,
  controllers.createComment
);

router.delete(
  "/posts/:id/comment/:commentId",
  isLoggedIn,
  isAuthor,
  controllers.deleteComment
);

module.exports = router;
// This module defines the routes for handling comments on posts.

