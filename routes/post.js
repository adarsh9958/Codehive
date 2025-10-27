const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodeOverride = require("method-override");
const path = require("path");
const router = express.Router();
exports.router = router;
const asyncWrapper = require("../utility/asyncWrapper");
const ExpressError = require("../utility/ExpressError");
const Post = require("../models/posts");
const { validatePost, isLoggedIn, isOwner } = require("../middlewares");
const controllers = require("../controllers/post");
const { render } = require("ejs");
// Set up EJS as the view engine with ejs-mate for layout support

router.get("/", (req, res) => {
  res.redirect("/posts");
});

// Post routes
// fetch posts from the database and render them on the index page
// Create a new post

router
  .route("/posts")
  .get( controllers.index)
  .post(isLoggedIn, validatePost, controllers.createPost);

// Create Posts form
router.get("/posts/new", isLoggedIn, controllers.renderNewPostForm);

// Show post // Update post // Delete post
router
  .route("/posts/:id")
  .get( controllers.showPost)
  .put(isLoggedIn, isOwner, validatePost, controllers.updatePost)
  .delete(isLoggedIn, isOwner, controllers.deletePost)
  .post(controllers.likePost)

// Render edit post form
router.get(
  "/posts/:id/edit",
  isLoggedIn,
  isOwner,
  controllers.renderEditPostForm
);
module.exports = router;
