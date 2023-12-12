const Food = require("../models/food.model.js");

const createFood = async (data) => {
  const food = new Food(data);
  return await food.save();
};

const getFoods = async () => {
  return await Food.find();
};

const getFood = async (id) => {
  return await Food.findById(id);
};

const updateFood = async (id, data) => {
  return await Food.findByIdAndUpdate(id, data, { new: true });
};

const deleteFood = async (id) => {
  return await Food.findByIdAndRemove(id);
};

const getFoodsByRestaurant = async (restaurantId) => {
  return await Food.find({ restaurantId });
};

module.exports = {
  createFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
  getFoodsByRestaurant,
};
