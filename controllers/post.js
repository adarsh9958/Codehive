const mongoose = require("mongoose");
const Post = require("../models/posts");
const { router } = require("../routes/post");
const asyncWrapper = require("../utility/asyncWrapper");
const User = require("../models/users");

module.exports.index = async (req, res) => {
  let posts = await Post.find().populate("owner");
  let users=await User.find();
  res.render("posts/index", {
    title: "All Posts",
    posts,
    currentPage: "posts",
    message: req.flash("error"),
    users
  });
};

module.exports.renderNewPostForm = async (req, res) => {
  res.render("posts/new", { title: "Create Posts" });
};

module.exports.createPost = asyncWrapper(async (req, res) => {
  let { title, content, code } = req.body.post;

  let newPost = new Post({
    title,
    content,
    code,
    likes: [], // explicitly set to empty array (optional since default is set)
    owner: req.session.user,
  });
  let postRes = await newPost.save();
  if (postRes) {
    req.flash("success", "Post created successfully!");
  } else {
    req.flash("error", "Failed to create post. Please try again.");
    return res.redirect("/posts/new");
  }
  res.redirect("/posts");
});

module.exports.showPost = asyncWrapper(async (req, res, next) => {
  let { id } = req.params;

  // Check if ID is a valid Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid post ID");
    return res.redirect("/posts");
  }

  const post = await Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  // If post not found, redirect with an error message
  if (!post) {
    req.flash("error", "Post not found");
    return res.redirect("/posts");
  }
  res.render("posts/show", { post, title: post.title });
});

module.exports.renderEditPostForm = asyncWrapper(async (req, res) => {
  let { id } = req.params;

  // Check if ID is a valid Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid post ID");
    return res.redirect("/posts");
  }

  let post = await Post.findById(id);
  if (!post) {
    req.flash("error", "The post you are trying to edit does not exist.");
    return res.redirect("/posts");
  }
  res.render("posts/edit", { post, title: post.title });
});

module.exports.updatePost = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  let { post } = req.body;
  if (!post) {
    throw new ExpressError("Post data is required", 400);
  }
  let updatePost = await Post.findByIdAndUpdate(
    id,
    {
      $set: {
        title: post.title,
        content: post.content,
        code: post.code,
      },
    },
    { new: true, runValidators: true }
  );
  // If post not found, throw an error
  if (!updatePost) {
    throw new ExpressError("Post Not Found", 400);
  } else {
    req.flash("success", "Post updated successfully!");
  }
  res.redirect(`/posts/${id}`);
});

module.exports.deletePost = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  let dltPost = await Post.findByIdAndDelete(id);
  if (!dltPost) {
    req.flash("error", "The Post you are trying to delete does not exist.");
  } else {
    req.flash("success", "Post deleted successfully!");
  }
  res.redirect("/posts");
});


module.exports.likePost=asyncWrapper(async(req,res)=>{
    let {id}=req.params;
    let userId=res.locals.currUser._id;
    
    let post=await Post.findById(id);

    let likedIndex=post.likes.indexOf(userId);

    if(likedIndex===-1){
      post.likes.push(userId);
    }else{
      post.likes.splice(likedIndex,1);
    }
    await post.save();
    return res.redirect(`/posts/${id}`);
  }
)