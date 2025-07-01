import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-xl w-full mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Recipe Title</span>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Description</span>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Cuisine</span>
          <Input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Meal Type</span>
          <Input
            type="text"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Tags (comma separated)</span>
          <Input
            type="text"
            value={tags.join(", ")}
            onChange={handleTagsChange}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Calories</span>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Image URL</span>
          <Input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Instructions</span>
          {instructions.map((ins, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <Input
                type="text"
                value={ins}
                onChange={(e) => handleInstructionChange(idx, e.target.value)}
                placeholder={`Step ${idx + 1}`}
                className="w-full"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-1 self-start"
            onClick={addInstruction}
          >
            + Add Instruction
          </Button>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Ingredients</span>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <Input
                type="text"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(idx, "name", e.target.value)
                }
                placeholder="Name"
                className="w-full"
              />
              <Input
                type="text"
                value={ing.amount}
                onChange={(e) =>
                  handleIngredientChange(idx, "amount", e.target.value)
                }
                placeholder="Amount"
                className="w-full sm:w-24"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-1 self-start"
            onClick={addIngredient}
          >
            + Add Ingredient
          </Button>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Notes</span>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Rating</span>
          <Input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full sm:w-24"
          />
        </label>
        <Button
          type="submit"
          className="w-full sm:w-auto mt-2"
        >
          Save Recipe
        </Button>
      </form>
    </div>
  );
};

export default EditRecipe;
