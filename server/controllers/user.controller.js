const userService = require("../services/user.service.js");

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json();
};

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};
