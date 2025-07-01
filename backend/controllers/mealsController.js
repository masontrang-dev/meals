const Meal = require("../models/Meal");

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate("recipeId");
    // Map only top-level _id to id for frontend compatibility
    const mapped = meals.map((m) => {
      const obj = m.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
};

const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("recipeId");
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meal" });
  }
};

const addMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(400).json({ error: "Failed to add meal" });
  }
};

module.exports = { getMeals, addMeal, getMealById };
