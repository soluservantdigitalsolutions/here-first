const Restaurant = require("../models/restaurant.model.js");

const User = require("../models/user.model.js"); // import User model

const createRestaurant = async (data) => {
  const restaurant = new Restaurant(data);
  const savedRestaurant = await restaurant.save();

  // update user model
  await User.findByIdAndUpdate(data.userId, {
    hasRestaurant: true,
    restaurantId: savedRestaurant._id,
  });

  return savedRestaurant;
};

const getRestaurants = async () => {
  return await Restaurant.find();
};

const getRestaurant = async (id) => {
  return await Restaurant.findById(id);
};

const updateRestaurant = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndRemove(id);
};

const getRestaurantByUserId = async (userId) => {
  return await Restaurant.findOne({ userId });
};


module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByUserId,
};
