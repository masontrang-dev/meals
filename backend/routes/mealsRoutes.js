const express = require("express");
const router = express.Router();
const { getMeals } = require("../controllers/mealsController");

router.get("/", getMeals);

module.exports = router;
