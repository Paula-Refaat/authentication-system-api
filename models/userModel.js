const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Name required"],
    minLength: [3, "Too short user name"],
  },
  google: {
    id: String,
    email: String,
  },
  facebook: { // Add Facebook fields
    id: String,
    email: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [
      function () {
        return !this.isOAuthUser;
      },
      "Password required",
    ],
    minlength: [8, "Too short Password"],
  },
  isOAuthUser: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
  phone: String,
  profileImg: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
