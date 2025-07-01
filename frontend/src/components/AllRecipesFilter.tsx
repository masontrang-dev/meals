import { useState, useEffect } from "react";
import ToggleFilter from "./ToggleFilter";
import RecipeCard from "./RecipeCard";
import { type Recipe } from "./AllRecipes";
import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";
import { useLocation } from "react-router-dom";
import RecipeModal from "./RecipeModal";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

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
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search recipes..."
        />
      </form>
      {/* Toggle Bar */}
      <div className="flex flex-wrap gap-2 justify-end mb-2">
        <button
          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm border border-gray-200 transition-colors ${
            sortOpen ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setSortOpen((v) => !v)}
          aria-label={sortOpen ? "Hide sort" : "Show sort"}
        >
          <span className="material-icons text-base">sort</span>
        </button>
        {/* Filters button triggers Drawer on mobile */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button
              className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm border border-gray-200 md:hidden transition-colors ${
                drawerOpen ? "ring-2 ring-blue-400" : ""
              }`}
              aria-label={drawerOpen ? "Hide filters" : "Show filters"}
              type="button"
            >
              <span className="material-icons text-base">filter_list</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="p-4 bg-white shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Filters</span>
              <DrawerClose asChild>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  aria-label="Close filters"
                >
                  <span className="material-icons">close</span>
                </button>
              </DrawerClose>
            </div>
            {/* SortSelect inside Drawer */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-700 font-medium">Sort</span>
              <SortSelect
                value={sort}
                onChange={setSort}
                options={sortOptions}
              />
            </div>
            {/* Filter Bar inside Drawer */}
            <div className="flex flex-col gap-4 mt-2">
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
              {/* Placeholder for Rating filter */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Rating</span>
                <div className="h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  (Rating filter coming soon)
                </div>
              </div>
              {/* Placeholder for Popularity filter */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Popularity</span>
                <div className="h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  (Popularity filter coming soon)
                </div>
              </div>
              {/* Placeholder for Tags filter */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Tags</span>
                <div className="h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  (Tags filter coming soon)
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {/* Sort Dropdown */}
      <div
        className={`transition-all duration-300 ${
          sortOpen
            ? "max-h-20 opacity-100 mb-2"
            : "max-h-0 opacity-0 overflow-hidden mb-0"
        }`}
      >
        <SortSelect value={sort} onChange={setSort} options={sortOptions} />
      </div>
      {/* Filter Bar (desktop only) */}
      <div
        className={`bg-white/80 rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row md:items-end gap-4 border border-gray-100 backdrop-blur-sm transition-all duration-300 hidden md:flex`}
      >
        <div className="flex-1 flex flex-col gap-2 md:flex-row md:gap-4">
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
      </div>
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
        />
      )}
    </div>
  );
};

export default AllRecipesFilter;
