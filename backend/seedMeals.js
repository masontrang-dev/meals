// Run this script with: node seedMeals.js
// Make sure your backend server is running on http://localhost:5000

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const today = new Date();
const pad = (n) => n.toString().padStart(2, "0");
const formatDate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

async function getRecipeIds() {
  const res = await fetch("http://localhost:5000/api/recipes");
  if (!res.ok) throw new Error("Failed to fetch recipes");
  const recipes = await res.json();
  return recipes.map((r) => r.id);
}

async function seed() {
  const recipeIds = await getRecipeIds();
  if (!recipeIds.length) throw new Error("No recipes found in database");
  // Helper to get a random recipeId
  const randomRecipeId = () =>
    recipeIds[Math.floor(Math.random() * recipeIds.length)];

  const meals = [
    // Today
    {
      date: formatDate(today),
      mealType: "breakfast",
      recipeId: randomRecipeId(),
      isCooked: false,
    },
    {
      date: formatDate(today),
      mealType: "lunch",
      recipeId: randomRecipeId(),
      isCooked: true,
    },
    // Tomorrow
    {
      date: formatDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      ),
      mealType: "breakfast",
      recipeId: randomRecipeId(),
      isCooked: false,
    },
    {
      date: formatDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      ),
      mealType: "dinner",
      recipeId: randomRecipeId(),
      isCooked: false,
    },
    // Day after tomorrow
    {
      date: formatDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
      ),
      mealType: "lunch",
      recipeId: randomRecipeId(),
      isCooked: false,
    },
  ];

  for (const meal of meals) {
    try {
      const res = await fetch("http://localhost:5000/api/meals/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });
      const data = await res.json();
      console.log("Inserted:", data);
    } catch (err) {
      console.error("Error inserting meal:", meal, err);
    }
  }
}

seed();
