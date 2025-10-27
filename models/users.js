const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

// User schema definition
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      filename: String,
      url: String,
    },
    followers:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],
    following:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }]
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12); // 12 rounds is a solid standard
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords during login
userSchema.methods.validatePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = model("User", userSchema);
module.exports = User;
