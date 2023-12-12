const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  profilePicture: { type: String, required: true },
  coverPicture: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
