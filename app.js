if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config();
}

const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const ejsMate = require("ejs-mate");
const methodeOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const profileRoutes=require("./routes/profile");
const { error } = require("console");
const db=process.env.MONGO_ATLAS;
const MongoStore=require("connect-mongo");
const mongoStoreSecret=process.env.mongoStoreSecret

const store = MongoStore.create({
    mongoUrl: db,
    touchAfter: 24 * 3600, // time period in seconds
    crypto: {
      secret: mongoStoreSecret,
    }
  })

const sessionOption = {
    store:store,
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
app.use(session(sessionOption));
app.use(flash());
// Middleware to set flash messages in res.locals
app.use((req, res, next) => {
  res.locals.currUser = req.session.user; // Store current user in res.locals
//   console.log(res.locals.flash)
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  //   console.log(res.locals.success, res.locals.error);
  next();
});

app.engine("ejs", ejsMate); // using ejs-mate for layout support in ejs

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(methodeOverride("_method")); // for method override support
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
}

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// All Routes

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use("/",profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    res.locals.err = err.message || "Something went wrong";
  }
  let { message = "Some error occurred", statusCode = 500 } = err;
  console.log(err);
  res.status(statusCode).render(`error.ejs`, { message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

