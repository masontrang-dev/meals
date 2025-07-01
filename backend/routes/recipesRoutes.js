const express = require("express");
const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  getRecipeById,
  getTopRecipes,
  getUpcomingMealsRecipes,
} = require("../controllers/recipesController");

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/add", addRecipe);
router.put("/edit/:id", updateRecipe);
router.get("/top/popular", getTopRecipes);
router.get("/upcoming/meals", getUpcomingMealsRecipes);

module.exports = router;
