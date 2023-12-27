const express = require("express");
const authRoutes = require("./auth.route.js");
const userRoutes = require("./user.route.js");
const restaurantRoutes = require("./restaurant.route.js");
const foodRoutes = require("./food.route.js");
const orderRoutes = require("./order.route.js");

const router = express.Router();

const base = "/api/v1";
router.use(`${base}/auth`, authRoutes);
router.use(`${base}/users`, userRoutes);
router.use(`${base}/restaurant`, restaurantRoutes);
router.use(`${base}/food`, foodRoutes);
router.use(`${base}/orders`, orderRoutes);

// Add other route handlers here

module.exports = router;
