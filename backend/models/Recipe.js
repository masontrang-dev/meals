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
  popularity: { type: Number, default: 0 },
  cuisine: String,
  mealType: String,
  tags: [String],
  ingredients: [IngredientSchema],
  instructions: [String],
  notes: String,
  rating: Number,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
