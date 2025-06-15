const mongoose = require("mongoose");
const Post = require("../models/posts");
const User = require("../models/users");
const { router } = require("../routes/post");
const asyncWrapper = require("../utility/asyncWrapper");

module.exports.userProfile = asyncWrapper(async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username: username });

  let posts = await Post.find().populate("owner");

  let userPosts = posts.filter((p) => {
    return p.owner._id.equals(user._id);
  });

  res.render("profile/profile", {
    title: username,
    userProfile: user,
    posts: userPosts,
  });
});

module.exports.addRemovefollow = asyncWrapper(async (req, res) => {
  let { id } = req.params;

  let userToFollow = await User.findById(id);
  let sessionUser = res.locals.currUser;
  let currUser = await User.findById(sessionUser._id);

  const isFollowing = userToFollow.followers.includes(currUser._id);

  if (isFollowing) {
    // Unfollow
    userToFollow.followers.pull(currUser._id);
    currUser.following.pull(userToFollow._id);
  } else {
    // Follow
    userToFollow.followers.push(currUser._id);
    currUser.following.push(userToFollow._id);
  }

  await userToFollow.save();
  await currUser.save();

  res.redirect(`/profile/${userToFollow.username}`);
});

module.exports.getFollowings = asyncWrapper(async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username: username }).populate("following");

  let followings = user.following;
  res.render("profile/following", { followings });
});

module.exports.getFollowers = asyncWrapper(async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username: username }).populate("followers");

  let followers = user.followers;
  res.render("profile/followers", { followers });
});

module.exports.renderUpdateForm = asyncWrapper(async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username: username });
  res.render("profile/editProfile", { user });
});

module.exports.updateUserProfile = asyncWrapper(async (req, res) => {
  let { userId } = req.params;
  let { user } = req.body;
  let userToUpdate = await User.findByIdAndUpdate(
    userId,
    { ...user },
    { new: true }
  );

  if (req.file && req.file.path && req.file.filename) {
    userToUpdate.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
    await userToUpdate.save();
  }

  return res.redirect(`/profile/${userToUpdate.username}`);
});
