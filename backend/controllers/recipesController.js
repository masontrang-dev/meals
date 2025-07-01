const Recipe = require("../models/Recipe");

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

module.exports = { getRecipes, addRecipe, updateRecipe, getRecipeById };
