import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardCompact from "@/components/RecipeCardCompact";

interface Recipe {
  id: string;
  image: string;
  title: string;
  description?: string;
  calories?: number;
}

const Home = () => {
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);
  const [upcomingRecipes, setUpcomingRecipes] = useState<Recipe[]>([]);
  const [topIndex, setTopIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/recipes/top/popular")
      .then((res) => res.json())
      .then((data) => setTopRecipes(data))
      .catch(() => setTopRecipes([]));

    fetch("/api/recipes/upcoming/meals")
      .then((res) => res.json())
      .then((data) => setUpcomingRecipes(data))
      .catch(() => setUpcomingRecipes([]));
  }, []);

  const handlePrev = (type: "top" | "upcoming") => {
    if (type === "top") setTopIndex((i) => Math.max(i - 1, 0));
    else setUpcomingIndex((i) => Math.max(i - 1, 0));
  };
  const handleNext = (type: "top" | "upcoming", arr: Recipe[]) => {
    if (type === "top") setTopIndex((i) => Math.min(i + 1, arr.length - 3));
    else setUpcomingIndex((i) => Math.min(i + 1, arr.length - 3));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[30vh] bg-blue-50 rounded-lg shadow-md p-8 mt-2">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
          alt="Healthy meal"
          className="w-32 h-32 rounded-full mb-6 shadow"
        />
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Welcome to Meals App!
        </h1>
        <p className="text-lg text-blue-900 mb-4 text-center">
          Plan your meals, discover new recipes, and make healthy eating easy.
        </p>
        <div>
          <Button variant="secondary">Plan a meal</Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-2 mt-4 w-full">
        <div className="text-lg font-semibold mb-4 text-center w-full max-w-xl mx-auto">
          Upcoming Meals
        </div>
        <div className="flex items-center justify-center w-full max-w-xl mx-auto">
          {upcomingRecipes.length > 3 && (
            <button
              className="flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 mr-2 w-8 h-8 text-lg hover:bg-gray-300 transition-colors"
              onClick={() => handlePrev("upcoming")}
              disabled={upcomingIndex === 0}
              aria-label="Previous"
              style={{ minWidth: 32 }}
            >
              <span className="inline-block align-middle">&#x2039;</span>
            </button>
          )}
          <div
            className="grid grid-cols-3 gap-2 justify-center"
            ref={upcomingRef}
          >
            {upcomingRecipes.length === 0 ? (
              <div className="text-gray-500 col-span-3 text-center">
                No upcoming meals found.
              </div>
            ) : (
              upcomingRecipes
                .slice(upcomingIndex, upcomingIndex + 3)
                .map((recipe) => (
                  <div
                    key={recipe.id}
                    className="w-24 aspect-square flex-shrink-0"
                  >
                    <RecipeCardCompact {...recipe} />
                  </div>
                ))
            )}
          </div>
          {upcomingRecipes.length > 3 && (
            <button
              className="flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 ml-2 w-8 h-8 text-lg hover:bg-gray-300 transition-colors"
              onClick={() => handleNext("upcoming", upcomingRecipes)}
              disabled={
                upcomingIndex >= Math.max(upcomingRecipes.length - 3, 0)
              }
              aria-label="Next"
              style={{ minWidth: 32 }}
            >
              <span className="inline-block align-middle">&#x203A;</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-2 mt-4 w-full">
        <div className="text-lg font-semibold mb-4 text-center w-full max-w-xl mx-auto">
          Popular Recipes
        </div>
        <div className="flex items-center justify-center w-full max-w-xl mx-auto">
          {topRecipes.length > 3 && (
            <button
              className="flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 mr-2 w-8 h-8 text-lg hover:bg-gray-300 transition-colors"
              onClick={() => handlePrev("top")}
              disabled={topIndex === 0}
              aria-label="Previous"
              style={{ minWidth: 32 }}
            >
              <span className="inline-block align-middle">&#x2039;</span>
            </button>
          )}
          <div className="grid grid-cols-3 gap-2 justify-center" ref={topRef}>
            {topRecipes.length === 0 ? (
              <div className="text-gray-500 col-span-3 text-center">
                No popular recipes found.
              </div>
            ) : (
              topRecipes.slice(topIndex, topIndex + 3).map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-24 aspect-square flex-shrink-0"
                >
                  <RecipeCardCompact {...recipe} />
                </div>
              ))
            )}
          </div>
          {topRecipes.length > 3 && (
            <button
              className="flex items-center justify-center bg-gray-200 rounded-full disabled:opacity-50 ml-2 w-8 h-8 text-lg hover:bg-gray-300 transition-colors"
              onClick={() => handleNext("top", topRecipes)}
              disabled={topIndex >= Math.max(topRecipes.length - 3, 0)}
              aria-label="Next"
              style={{ minWidth: 32 }}
            >
              <span className="inline-block align-middle">&#x203A;</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-8 mt-4">
        <div>Stats (how many meals cooked this/per week)</div>
      </div>
    </div>
  );
};

export default Home;
