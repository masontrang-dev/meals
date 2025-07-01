const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: String,
    amount: String,
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  calories: Number,
  popularity: Number,
  cuisine: String,
  mealType: String,
  tags: [String],
  ingredients: [IngredientSchema],
  instructions: [String],
  notes: String,
  rating: Number,
  popularity: Number,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
