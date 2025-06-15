const ExpressError = require("./utility/ExpressError");
const {postSchema,commentSchema} = require("./schema");
const Comment=require("./models/comments");
const Post = require("./models/posts");

module.exports.isLoggedIn= (req, res, next) => {
  req.session.redirectUrl=req.originalUrl;
  if (!req.session.user) {
    req.session.redirectUrl=req.originalUrl;
     // If the user is not logged in, save the current URL to return to after login
    req.flash("error", "You must be logged in !");
    return res.redirect("/login");
  }
  next();
}

module.exports.isAuthor=async (req,res,next)=>{
  let {id,commentId}=req.params;
  let comment=await Comment.findById(commentId).populate("author");

  if(String(comment.author._id)!==String(req.session.user._id)){
    req.flash("error","You are not the owner of comment");
    return res.redirect(`/posts/${id}`);
  }
  next();
}

module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  let post=await Post.findById(id).populate("owner");
  let owner=String(post.owner._id);
  let sessionUser=String(req.session.user._id);
  if(owner!==sessionUser){
    req.flash("error","You are not the owner of post !");
    return res.redirect(`/posts/${id}`);
  }
  next();
}

module.exports.validatePost = (req, res, next) => {
  let { error } = postSchema.validate(req.body);
  //   console.log(req.params.id);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};

module.exports.validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);
  //   console.log(req.params.id);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};
