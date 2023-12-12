const orderService = require("../services/order.service");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByRestaurant(
      req.params.restaurantId
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};