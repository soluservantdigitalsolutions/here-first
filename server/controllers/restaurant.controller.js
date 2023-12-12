const restaurantService = require("../services/restaurant.service");
const User = require("../models/user.model");

const createRestaurant = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      userId: req.body.userId,
      address: req.body.address,
      profilePicture: req.files.profilePicture[0].path,
      coverPicture: req.files.coverPicture[0].path,
    };
    const restaurant = await restaurantService.createRestaurant(data);
    res.status(201).json(restaurant);
    // After creating a restaurant
    const user = await User.findById(req.body.userId);
    user.hasRestaurant = true;
    await user.save();
  } catch (err) {
    console.log(err);
  }
};
const getRestaurants = async (req, res) => {
  const restaurants = await restaurantService.getRestaurants();
  res.status(200).json(restaurants);
};

const getRestaurant = async (req, res) => {
  const restaurant = await restaurantService.getRestaurant(req.params.id);
  res.status(200).json(restaurant);
};

const updateRestaurant = async (req, res) => {
  const restaurant = await restaurantService.updateRestaurant(
    req.params.id,
    req.body
  );
  res.status(200).json(restaurant);
};

const deleteRestaurant = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
  await restaurantService.deleteRestaurant(req.params.id);
  res.status(204).json({
    message: "Restaurant has been deleted Successfully",
  });
};

const checkUserHasRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.hasRestaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRestaurantByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const restaurant = await restaurantService.getRestaurantByUserId(userId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found for the given user" });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  checkUserHasRestaurant,
  getRestaurantByUser,
};
