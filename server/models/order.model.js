const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  foodPreferences: [
    {
      type: String,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
