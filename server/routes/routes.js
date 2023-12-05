const express = require("express");
const authRoutes = require("./auth.route.js");
const userRoutes = require("./user.route.js");


const router = express.Router();


const base = "/api/v1"
router.use(`${base}/auth`, authRoutes);
router.use(`${base}/users`, userRoutes);



// Add other route handlers here

module.exports = router;
