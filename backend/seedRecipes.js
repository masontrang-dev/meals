// Run this script with: node seedRecipes.js
// Make sure your backend server is running on http://localhost:5000

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Add dateAdded to each recipe
const recipes = [
  {
    title: "Grilled Chicken Salad",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Fresh greens with grilled chicken and vinaigrette.",
    calories: 350,
    popularity: 7,
    cuisine: "American",
    mealType: "Lunch",
    tags: ["chicken", "salad", "healthy"],
    ingredients: [
      { name: "Chicken Breast", amount: "200g" },
      { name: "Lettuce", amount: "100g" },
      { name: "Tomato", amount: "50g" },
    ],
    instructions: [
      "Grill the chicken breast until cooked through.",
      "Slice the chicken and set aside.",
      "Combine all ingredients and toss with vinaigrette.",
    ],
    notes: "You can add other vegetables or nuts as per your preference.",
    rating: 4.5,
  },
  {
    title: "Pasta Primavera",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    description: "Pasta with seasonal vegetables and light sauce.",
    calories: 420,
    popularity: 12,
    cuisine: "Italian",
    mealType: "Dinner",
    tags: ["pasta", "vegetarian", "Italian"],
    ingredients: [
      { name: "Pasta", amount: "250g" },
      { name: "Olive Oil", amount: "3 tbsp" },
      { name: "Garlic", amount: "2 cloves" },
    ],
    instructions: [
      "Cook the pasta according to package instructions.",
      "Sauté garlic and vegetables in olive oil.",
      "Combine with pasta and serve.",
    ],
    notes: "Great with a side of garlic bread and salad.",
    rating: 4.7,
  },
  {
    title: "Avocado Toast",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    description: "Sourdough toast topped with smashed avocado.",
    calories: 250,
    popularity: 20,
    cuisine: "American",
    mealType: "Breakfast",
    tags: ["avocado", "toast", "breakfast"],
    ingredients: [
      { name: "Sourdough Bread", amount: "2 slices" },
      { name: "Avocado", amount: "1" },
      { name: "Salt", amount: "to taste" },
    ],
    instructions: [
      "Toast the bread.",
      "Mash the avocado and spread on toast.",
      "Sprinkle with salt and serve.",
    ],
    notes: "Add chili flakes or a poached egg for extra flavor.",
    rating: 4.2,
  },
].map((r) => ({
  ...r,
  dateAdded: r.dateAdded || new Date(),
}));

async function seed() {
  for (const recipe of recipes) {
    try {
      const res = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      const data = await res.json();
      console.log("Inserted:", data.title);
    } catch (err) {
      console.error("Error inserting recipe:", recipe.title, err);
    }
  }
}

seed();
