const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const parser = require("../utils/cloudinary");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.post(
  "/create-restaurant",
  parser.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  restaurantController.createRestaurant
);
router.get("/get-restaurants", restaurantController.getRestaurants);
router.get("/get-restaurant/:id", restaurantController.getRestaurant);
router.put("/update-restaurant/:id", restaurantController.updateRestaurant);
router.delete("/delete-restaurant/:id", restaurantController.deleteRestaurant);
router.get(
  "/restaurant-owner-check/:userId",
  restaurantController.checkUserHasRestaurant
);
router.get(
  "/get-restaurant-by-user/:userId",
  restaurantController.getRestaurantByUser
);

module.exports = router;
