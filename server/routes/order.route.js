const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/create-order", orderController.createOrder);
router.get("/get-order/:id", orderController.getOrder);
router.put("/update-order/:id", orderController.updateOrder);
router.delete("/delete-order/:id", orderController.deleteOrder);
router.get("/get-resturant-orders/:restaurantId", orderController.getOrdersByRestaurant);

module.exports = router;
