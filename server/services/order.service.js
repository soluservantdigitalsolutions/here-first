const Order = require("../models/order.model");
const User = require("../models/user.model");
const Food = require("../models/food.model");
const Restaurant = require("../models/restaurant.model");

exports.createOrder = async (data) => {
  const { userId, food, restaurantId, foodPreferences } = data;
  const user = await User.findById(userId);
  const foodItem = await Food.findById(food.id);
  const restaurant = await Restaurant.findById(restaurantId);
  const restaurantOwner = await User.findById(restaurant.userId);

  if (user.wallet < foodItem.price * food.quantity) {
    throw new Error("Insufficient funds in wallet");
  }

  const order = new Order({
    user: userId,
    food: {
      id: food.id,
      quantity: food.quantity,
    },
    restaurant: restaurantId,
    total: foodItem.price * food.quantity,
    foodPreferences: foodPreferences,
  });

  await order.save();

  user.wallet -= order.total;
  await user.save();

  restaurantOwner.wallet += order.total;
  await restaurantOwner.save();

  return order;
};

exports.getOrder = async (id) => {
  return await Order.findById(id);
};

exports.updateOrder = async (id, data) => {
  // update order logic here
};

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

exports.getOrdersByRestaurant = async (restaurantId) => {
  return await Order.find({ restaurant: restaurantId });
};
