import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewRecipe = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then((recipe) => {
        setData(recipe);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching recipe");
        setData(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return <div className="p-6">Recipe not found. {id}</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
      >
        &larr; Back
      </button>
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full rounded-xl mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      {data.description && (
        <div className="text-gray-700 mb-2">{data.description}</div>
      )}
      {data.calories && (
        <div className="text-sm text-gray-500 mb-2">{data.calories} kcal</div>
      )}
      {data.cuisine && (
        <div className="mb-2">
          <span className="font-semibold">Cuisine: </span>
          <span>{data.cuisine}</span>
        </div>
      )}
      {data.mealType && (
        <div className="mb-2">
          <span className="font-semibold">Meal Type: </span>
          <span>{data.mealType}</span>
        </div>
      )}
      {data.tags && data.tags.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Tags: </span>
          <span>{data.tags.join(", ")}</span>
        </div>
      )}
      {data.ingredients && data.ingredients.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Ingredients:</span>
          <ul className="list-disc list-inside ml-4">
            {data.ingredients.map((ing: any, idx: number) => (
              <li key={idx}>
                {ing.name}
                {ing.amount && (
                  <span className="text-gray-500"> ({ing.amount})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.instructions && data.instructions.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Instructions:</span>
          <ol className="list-decimal list-inside ml-4">
            {data.instructions.map((ins: string, idx: number) =>
              ins ? <li key={idx}>{ins}</li> : null
            )}
          </ol>
        </div>
      )}
      {data.notes && (
        <div className="mb-2">
          <span className="font-semibold">Notes: </span>
          <span>{data.notes}</span>
        </div>
      )}
      {data.rating && (
        <div className="mb-4">
          <span className="font-semibold">Rating: </span>
          <span>{data.rating} / 5</span>
        </div>
      )}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        onClick={() => navigate(`/recipes/${id}/edit`)}
      >
        Edit Recipe
      </button>
    </div>
  );
};

export default ViewRecipe;
