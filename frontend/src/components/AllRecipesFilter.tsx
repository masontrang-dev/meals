import { useState, useEffect } from "react";
import ToggleFilter from "./ToggleFilter";
import RecipeCard from "./RecipeCard";
import { type Recipe } from "./AllRecipes";
import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";
import { useLocation } from "react-router-dom";
import RecipeModal from "./RecipeModal";

const sortOptions = [
  { value: "title", label: "Title (A-Z)" },
  { value: "titleDesc", label: "Title (Z-A)" },
  { value: "popularity", label: "Popularity (Low-High)" },
  { value: "popularityDesc", label: "Popularity (High-Low)" },
];

const cuisineTypes = ["American", "Italian", "Asian", "Mexican", "French"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const AllRecipesFilter: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const location = useLocation();
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  // Helper to toggle selection
  const toggle = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const filtered = recipes.filter((r: any) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCuisine =
      selectedCuisines.length === 0 ||
      (r.cuisine && selectedCuisines.includes(r.cuisine));
    const matchesMealType =
      selectedMealTypes.length === 0 ||
      (r.mealType && selectedMealTypes.includes(r.mealType));
    return matchesSearch && matchesCuisine && matchesMealType;
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "titleDesc") return b.title.localeCompare(a.title);
    if (sort === "popularity") return (a.popularity || 0) - (b.popularity || 0);
    if (sort === "popularityDesc")
      return (b.popularity || 0) - (a.popularity || 0);
    return 0;
  });

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4 w-full">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search recipes..."
        />
        <SortSelect value={sort} onChange={setSort} options={sortOptions} />
        <ToggleFilter
          options={cuisineTypes}
          selected={selectedCuisines}
          onToggle={(cuisine) =>
            setSelectedCuisines(toggle(selectedCuisines, cuisine))
          }
          color="blue"
          label="Cuisine"
        />
        <ToggleFilter
          options={mealTypes}
          selected={selectedMealTypes}
          onToggle={(mealType) =>
            setSelectedMealTypes(toggle(selectedMealTypes, mealType))
          }
          color="green"
          label="Meal Type"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {sorted.map((recipe) => (
          <div
            key={recipe.id}
            style={{ position: "relative" }}
            onClick={() => {
              if (location.pathname === "/meals/add") {
                setModalRecipe(recipe);
              } else {
                window.location.href = `/recipes/${recipe.id}`;
              }
            }}
            className="cursor-pointer"
          >
            <RecipeCard
              id={recipe.id.toString()}
              image={recipe.image}
              title={recipe.title}
              description={recipe.description}
              calories={recipe.calories}
            />
          </div>
        ))}
      </div>
      {modalRecipe && (
        <RecipeModal
          recipe={modalRecipe}
          onClose={() => setModalRecipe(null)}
        />
      )}
    </div>
  );
};

export default AllRecipesFilter;
