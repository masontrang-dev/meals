import { useLocation, useNavigate } from "react-router-dom";
import RectAddMealButton from "./RectAddMealButton";

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = location.pathname !== "/";
  const isRecipes = location.pathname.startsWith("/recipes");

  return (
    <div className="flex items-center gap-4 w-full">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-bold px-2 py-1 rounded hover:bg-gray-100"
        >
          ← Back
        </button>
      )}

      {isRecipes && (
        <RectAddMealButton
          onClick={() => navigate("/recipes/add")}
          label="Add Recipe"
        />
      )}
    </div>
  );
}
