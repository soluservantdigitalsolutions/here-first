const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const parser = require("../utils/cloudinary");
const verifyToken = require("../middlewares/verifyToken");

router.post(
  "/create-food",
  verifyToken,
  parser.single("image"),
  foodController.createFood
);
router.get("/get-foods", verifyToken, foodController.getFoods);
router.get("/get-food/:id", verifyToken, foodController.getFood);
router.put("/update-food/:id", verifyToken, foodController.updateFood);
router.delete("/delete-food/:id", verifyToken, foodController.deleteFood);
router.get(
  "/get-foods/:restaurantId",
  verifyToken,
  foodController.getFoodsByRestaurant
);
module.exports = router;
