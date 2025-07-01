import { useNavigate } from "react-router-dom";
import RectAddMealButton from "../components/RectAddMealButton";
import AllRecipesFilter from "@/components/AllRecipesFilter";

const Recipes = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Recipes Gallery</h1>
        <RectAddMealButton
          onClick={() => navigate("/recipes/add")}
          label="Add Recipe"
        />
      </div>
      {/* <AllRecipes /> */}
      <AllRecipesFilter />
    </div>
  );
};

export default Recipes;
