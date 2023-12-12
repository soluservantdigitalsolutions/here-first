const User = require("../models/user.model.js");

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.getAllUsers = async () => {
  return await User.find({});
};

exports.updateWallet = async (userId, amount) => {
  return await User.findByIdAndUpdate(
    userId,
    { $inc: { wallet: amount } },
    { new: true }
  );
};
