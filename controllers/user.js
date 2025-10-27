const User = require("../models/users");
const asyncWrapper = require("../utility/asyncWrapper");


module.exports.renderSignUpForm = (req, res) => {
  res.render("users/register", { title: "Sign Up Here" });
};

module.exports.signUpUser = asyncWrapper(async (req, res) => {
  let { user } = req.body;
  user.image = {
    filename: req.file.filename,
    url: req.file.path,
  };

  let newUser = new User({ ...user }); // password will be auto-hashed
  let svdUser = await newUser.save();
  req.session.user = svdUser;

  console.log(svdUser);
  req.flash("success", "Welcome to CodeHive!");
  res.redirect("/posts");
});

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login", { title: "Login Here" });
};

module.exports.loginUser = async (req, res) => {
  let { username, password } = req.body.user;
  let user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }
  let isValid = await user.validatePassword(password);
  if (isValid) {
    req.session.user = user; // Store user in session
    req.flash("success", `Welcome back, ${user.username}!`);
    let path=req.session.redirectUrl || "/posts";
    res.redirect(`${path}`);
  } else {
    req.flash("error", "Invalid username or password");
    res.redirect("/login");
  }
};

module.exports.logoutUser = (req, res) => {
  req.flash("success", "Logged out successfully");
  req.session.destroy((err) => {
    if (err) {
      console.log("Session destruction error:", err);
      return res.redirect("/posts");
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.redirect("/posts");
  });
};
