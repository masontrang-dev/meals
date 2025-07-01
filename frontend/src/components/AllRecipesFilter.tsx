import { useState, useEffect } from "react";

import RecipeCard from "./RecipeCard";

import SearchInput from "./SearchInput";
import { useLocation } from "react-router-dom";
import RecipeModal from "./RecipeModal";
import FilterDrawer from "./FilterDrawer";
import SortDrawer from "./SortDrawer";
import { Search } from "lucide-react";

export interface Recipe {
  ingredients: [{name: string, amount: string}];
  instructions: string[];
  notes: any;
  id: string;
  image: string;
  title: string;
  description?: string;
  calories?: number;
  cuisine?: string;
  mealType?: string;
  popularity?: number;
}

const sortOptions = [
  { value: "title", label: "Title (A-Z)" },
  { value: "titleDesc", label: "Title (Z-A)" },
  { value: "popularity", label: "Popularity (Low-High)" },
  { value: "popularityDesc", label: "Popularity (High-Low)" },
];

const cuisineTypes = ["American", "Italian", "Asian", "Mexican", "French"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

interface AllRecipesFilterProps {
  date?: string;
}

const AllRecipesFilter: React.FC<AllRecipesFilterProps> = ({ date }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const location = useLocation();
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar (always visible) */}
      <form
        className="flex items-center gap-2 mb-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
    <input
      type="search"
      className="bg-transparent border-input text-primary placeholder:text-muted-foreground shadow-md rounded-md px-12 py-2 w-full outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50"
      value={search}
      onChange={setSearch}
      placeholder="Search recipes..."

    />
  </div>
      </form>
      {/* Toggle Bar */}
      <div className="flex flex-wrap gap-2 justify-start mb-2">
        <FilterDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          selectedCuisines={selectedCuisines}
          setSelectedCuisines={setSelectedCuisines}
          selectedMealTypes={selectedMealTypes}
          setSelectedMealTypes={setSelectedMealTypes}
          cuisineTypes={cuisineTypes}
          mealTypes={mealTypes}
          toggle={toggle}
        />
        <SortDrawer
          open={sortOpen}
          setOpen={setSortOpen}
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />

        
      
  
    {/* Divider */}
    <div className="border-b border-gray-200 mb-6" />
    {/* Recipe Grid */}
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
        date={date}
      />
    )}
  </div>
  </div>)
};

export default AllRecipesFilter;
