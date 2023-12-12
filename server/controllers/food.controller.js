const foodService = require("../services/food.service");

const createFood = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      restaurantId: req.body.restaurantId,
      image: req.file.path,
      ...req.body,
    };
    const food = await foodService.createFood(data);
    res.status(201).json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await foodService.getFoods();
    res.status(200).json(foods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getFood = async (req, res) => {
  try {
    const food = await foodService.getFood(req.params.id);
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await foodService.updateFood(req.params.id, req.body);
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    await foodService.deleteFood(req.params.id);
    res.status(204).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getFoodsByRestaurant = async (req, res) => {
  try {
    const foods = await foodService.getFoodsByRestaurant(
      req.params.restaurantId
    );
    res.status(200).json(foods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
  getFoodsByRestaurant,
};
