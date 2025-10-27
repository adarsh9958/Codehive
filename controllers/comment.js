const asyncWrapper = require("../utility/asyncWrapper");
const Comment = require("../models/comments");
const Post = require("../models/posts");

module.exports.createComment = asyncWrapper(async (req, res) => {
  let { id } = req.params;
  let { comment } = req.body;
  let newComment = new Comment({ ...comment ,author:req.session.user});

  let svdComment = await newComment.save();
  if (svdComment) {
    let updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: svdComment._id } }    );
    req.flash("success", "Comment added successfully!");
  } else {
    req.flash("error", "Failed to add comment. Please try again.");
  }
  res.redirect(`/posts/${id}`);
});

module.exports.deleteComment = asyncWrapper(async (req, res) => {
  let { id, commentId } = req.params;
  let comment=await Comment.findById(commentId).populate("author");
    // Delete the comment
    let deletedComment = await Comment.findByIdAndDelete(commentId);
    if (deletedComment) {
      // Remove the comment reference from the post
      await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
      req.flash("success", "Comment deleted successfully!");
    } else {
      req.flash("error", "Failed to delete comment. Please try again.");
    }
    res.redirect(`/posts/${id}`);
});
