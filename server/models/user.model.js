const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
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
  accountBalance: {
    type: Number,
  },
  verificationToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
