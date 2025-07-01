const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  date: String,
  mealType: String,
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  isCooked: Boolean,
});

module.exports = mongoose.model("Meal", MealSchema);
