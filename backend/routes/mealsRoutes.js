const express = require("express");
const router = express.Router();
const {
  getMeals,
  addMeal,
  getMealById,
} = require("../controllers/mealsController");

router.get("/", getMeals);
router.get("/:id", getMealById);
router.post("/add", addMeal);

module.exports = router;
