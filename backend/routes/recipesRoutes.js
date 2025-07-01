const express = require("express");
const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  getRecipeById,
} = require("../controllers/recipesController");

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/add", addRecipe);
router.put("/edit/:id", updateRecipe);

module.exports = router;
