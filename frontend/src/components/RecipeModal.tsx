import React from "react";
import { Button } from "@/components/ui/button";
import { type Recipe } from "./AllRecipesFilter";

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  date?: string;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  date,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          aria-label="Close"
          variant="secondary"
        >
          ×
        </Button>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <div className="mb-2 text-gray-700">{recipe.description}</div>
        <div className="mb-2 text-sm text-gray-500">
          Calories: {recipe.calories ?? "N/A"}
        </div>
        <div className="mb-2 text-sm text-gray-500">
          Cuisine: {recipe.cuisine ?? "N/A"}
        </div>
        <div className="mb-2 text-sm text-gray-500">
          Meal Type: {recipe.mealType ?? "N/A"}
        </div>
        <div className="mb-2 text-sm text-gray-500">
          Times Cooked:{" "}
          {typeof recipe.popularity === "number" ? recipe.popularity : "N/A"}
        </div>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mb-2">
            <div className="font-semibold text-sm mb-1">Ingredients:</div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {recipe.ingredients.map((ing: any, i: number) => {
                if (typeof ing === "string") return <li key={i}>{ing}</li>;
                const name = ing.name || "";
                const amount = ing.amount ? ` (${ing.amount})` : "";
                return (
                  <li key={i}>
                    {name}
                    {amount}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {recipe.instructions && recipe.instructions.length > 0 && (
          <div className="mb-2">
            <div className="font-semibold text-sm mb-1">Instructions:</div>
            <ol className="list-decimal list-inside text-sm text-gray-700">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        {recipe.notes && (
          <div className="mb-2">
            <div className="font-semibold text-sm mb-1">Notes:</div>
            <div className="text-sm text-gray-700">{recipe.notes}</div>
          </div>
        )}
        {date && (
          <Button
            className="mt-4 w-full py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
            onClick={async () => {
              await fetch("/api/meals/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  date,
                  recipeId: recipe.id,
                }),
              });
              onClose();
            }}
          >
            Add Meal
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
