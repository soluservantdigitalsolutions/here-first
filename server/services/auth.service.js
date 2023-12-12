const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const signup = async (req, username, email, password, fullName) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, fullName });

  // Generate a verification token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Save the verification token
  user.verificationToken = verificationToken;

  await user.save();

  // Send the verification email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD
    },
  });
  const mailOptions = {
    to: user.email,
    subject: "Please verify your email address",
    html: `
      <h1>Welcome to HEREFIRST!</h1>
      <p>Please verify your email address by clicking the following link:</p>
      <a href="http://${req.headers.host}/api/v1/auth/verify-email?token=${verificationToken}">Verify Email</a>

      <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: blue; }
        a { display: inline-block; margin-top: 20px; padding: 10px; background: green; color: white; text-decoration: none; }
      </style>
    `,
  };
  await transporter.sendMail(mailOptions);
  const token = jwt.sign(
    {
      userId: user.id,
      profileImg: user.profileImg,
      username: user.username,
      phoneNumber: user.phoneNumber,
    },
    process.env.JWT_SECRET
  );

  return { token, user };
};

const verifyEmail = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  return { user };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found with this email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      profileImg: user.profileImg,
      username: user.username,
      phoneNumber: user.phoneNumber,
    },
    process.env.JWT_SECRET
  );

  return { token, user };
};

module.exports = {
  signup,
  login,
  verifyEmail,
};
