const mongoose = require("mongoose");
const Post = require("../models/posts");
const data = require("./data");

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/codeHive");
}

const initDb = async () => {
  await Post.deleteMany();
  const updatedData = data.map(obj => ({
    ...obj,
    owner: '68442b625e16bae260740b17',
    likes: '68442b625e16bae260740b17',
  }));
  // console.log(updatedData);
  const allPosts = await Post.insertMany(updatedData);
  console.log("Database initialized with posts:", allPosts);
};
initDb();
