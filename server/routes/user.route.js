const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
