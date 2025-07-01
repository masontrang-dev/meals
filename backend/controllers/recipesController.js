const Recipe = require("../models/Recipe");
const Meal = require("../models/Meal");

const getRecipes = async (req, res) => {
  //TO-DO: Reduce payload size
  try {
    const recipes = await Recipe.find();
    // Map _id to id for frontend compatibility
    const mapped = recipes.map((r) => {
      const obj = r.toObject();
      return { ...obj, id: obj._id };
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    const obj = recipe.toObject();
    res.json({ ...obj, id: obj._id });
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch recipe" });
  }
};
const addRecipe = async (req, res) => {
  console.log("add recipe");
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: "Failed to add recipe" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: "Failed to update recipe" });
  }
};

const getTopRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ popularity: -1 }).limit(5);
    const mapped = recipes.map((r) => {
      const obj = r.toObject();
      return { ...obj, id: obj._id };
    });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top recipes" });
  }
};

const getUpcomingMealsRecipes = async (req, res) => {
  try {
    // Get today and 5 days ahead
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(today.getDate() + 5);

    // Find meals in the next 5 days (inclusive)
    const meals = await Meal.find({
      date: {
        $gte: today.toISOString().slice(0, 10),
        $lte: end.toISOString().slice(0, 10),
      },
    }).populate("recipeId");

    // Collect unique recipes
    const seen = new Set();
    const uniqueRecipes = [];
    for (const meal of meals) {
      const recipe = meal.recipeId;
      if (recipe && !seen.has(recipe._id.toString())) {
        seen.add(recipe._id.toString());
        const obj = recipe.toObject();
        uniqueRecipes.push({ ...obj, id: obj._id });
      }
    }
    res.json(uniqueRecipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch upcoming meals recipes" });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  updateRecipe,
  getRecipeById,
  getTopRecipes,
  getUpcomingMealsRecipes,
};
