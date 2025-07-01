import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const fetchMealById = async (id: string) => {
  const res = await fetch(`/api/meals/${id}`);
  if (!res.ok) throw new Error("Meal not found");
  return res.json();
};

const ViewMeal = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // For editable fields
  const [isCooked, setIsCooked] = useState(false);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner">(
    "breakfast"
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchMealById(id)
      .then((data) => {
        setMeal(data);
        setIsCooked(data.isCooked);
        setMealType(data.mealType);
      })
      .catch((err) => {
        setError(err.message || "Error fetching meal");
        setMeal(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!meal) return <div className="p-6">Meal not found. {id}</div>;

  // If meal.recipeId is populated with recipe object, use it for display
  const recipe = typeof meal.recipeId === "object" ? meal.recipeId : null;

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
      >
        &larr; Back
      </button>
      {recipe && recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-xl mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">
        {recipe ? recipe.title : "Meal"}
      </h1>
      <div className="text-gray-700 mb-2">
        {recipe ? recipe.description : null}
      </div>
      {recipe && recipe.calories && (
        <div className="text-sm text-gray-500 mb-2">{recipe.calories} kcal</div>
      )}
      <div className="mb-2">
        <span className="font-semibold">Date: </span>
        <span>{meal.date}</span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold">Meal Type: </span>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={mealType}
          onChange={(e) => setMealType(e.target.value as typeof mealType)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold">Cooked: </span>
        <button
          className={`px-2 py-1 rounded text-sm font-semibold border ${
            isCooked
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
          onClick={() => setIsCooked((v) => !v)}
        >
          {isCooked ? "Yes" : "No"}
        </button>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Recipe ID: </span>
        <span>{recipe ? recipe._id : meal.recipeId}</span>
      </div>
    </div>
  );
};

export default ViewMeal;
