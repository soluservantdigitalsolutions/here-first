const express = require("express");
const authRoutes = require("./auth.route.js");

const router = express.Router();


const base = "/api/v1"
router.use(`${base}/auth`, authRoutes);


// Add other route handlers here

module.exports = router;
