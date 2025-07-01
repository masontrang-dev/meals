import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import AllRecipesFilter from "./AllRecipesFilter";

export interface Recipe {
  id: number;
  image: string;
  title: string;
  description?: string;
  calories?: number;
  popularity?: number; // times cooked
  cuisine?: string;
  mealType?: string;
  ingredients?: string[];
  instructions?: string[];
  notes?: string;
  rating?: number;
}

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

const AllRecipes: React.FC = () => {
  const { recipes, loading, error } = useFetchRecipes();
  const [search, setSearch] = useState("");

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4 items-center w-full"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {filtered.map((recipe) => (
          <div key={recipe.id} style={{ position: "relative" }}>
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
    </div>
  );
};

// Export both the presentational and filter-enhanced versions
export { AllRecipesFilter };
export default AllRecipes;
