import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditRecipe = () => {
  const { id } = useParams();
  const isAddMode = id === "add" || !id;
  const [data, setData] = useState<any>(isAddMode ? {} : null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [image, setImage] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<
    { name: string; amount: string }[]
  >([{ name: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAddMode) {
      setData({});
      setTitle("");
      setDescription("");
      setCalories("");
      setImage("");
      setCuisine("");
      setMealType("");
      setTags([]);
      setNotes("");
      setRating("");
      setInstructions([""]);
      setIngredients([{ name: "", amount: "" }]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then((found) => {
        setData(found);
        setTitle(found.title || "");
        setDescription(found.description || "");
        setCalories(found.calories?.toString() || "");
        setImage(found.image || "");
        setCuisine(found.cuisine || "");
        setMealType(found.mealType || "");
        setTags(found.tags || []);
        setNotes(found.notes || "");
        setRating(found.rating?.toString() || "");
        setInstructions(found.instructions || [""]);
        setIngredients(found.ingredients || [{ name: "", amount: "" }]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching recipe");
        setData(null);
        setLoading(false);
      });
  }, [id, isAddMode]);

  if (!isAddMode && loading) return <div className="p-6">Loading...</div>;
  if (!isAddMode && error)
    return <div className="p-6 text-red-600">{error}</div>;
  if (!isAddMode && !data)
    return <div className="p-6">Recipe not found. {id}</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      calories: Number(calories),
      image,
      cuisine,
      mealType,
      tags,
      notes,
      rating: Number(rating),
      instructions,
      ingredients,
    };
    try {
      if (isAddMode) {
        // POST to create new recipe
        const res = await fetch("http://localhost:5000/api/recipes/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipeData),
        });
        if (!res.ok) throw new Error("Failed to add recipe");
        alert("Recipe added!");
      } else {
        // PUT to update existing recipe
        const res = await fetch(
          `http://localhost:5000/api/recipes/edit/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeData),
          }
        );
        if (!res.ok) throw new Error("Failed to update recipe");
        alert("Recipe updated!");
      }
    } catch (err: any) {
      alert(err.message || "Error saving recipe");
    }
  };

  const handleInstructionChange = (idx: number, value: string) => {
    setInstructions((prev) => prev.map((ins, i) => (i === idx ? value : ins)));
  };
  const addInstruction = () => setInstructions((prev) => [...prev, ""]);

  const handleIngredientChange = (
    idx: number,
    field: "name" | "amount",
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
    );
  };
  const addIngredient = () =>
    setIngredients((prev) => [...prev, { name: "", amount: "" }]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(
      e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Recipe Title</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Description</span>
          <textarea
            className="border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Cuisine</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Meal Type</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Tags (comma separated)</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={tags.join(", ")}
            onChange={handleTagsChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Calories</span>
          <input
            className="border rounded px-3 py-2"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Image URL</span>
          <input
            className="border rounded px-3 py-2"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Instructions</span>
          {instructions.map((ins, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={ins}
                onChange={(e) => handleInstructionChange(idx, e.target.value)}
                placeholder={`Step ${idx + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs self-start"
            onClick={addInstruction}
          >
            + Add Instruction
          </button>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Ingredients</span>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(idx, "name", e.target.value)
                }
                placeholder="Name"
              />
              <input
                className="border rounded px-3 py-2 w-24"
                type="text"
                value={ing.amount}
                onChange={(e) =>
                  handleIngredientChange(idx, "amount", e.target.value)
                }
                placeholder="Amount"
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs self-start"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Notes</span>
          <textarea
            className="border rounded px-3 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Rating</span>
          <input
            className="border rounded px-3 py-2 w-24"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
