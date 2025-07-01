import { useLocation, useNavigate } from "react-router-dom";
import RectAddMealButton from "./RectAddMealButton";
import { useMealsNav } from "../context/MealsNavContext";

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jumpToToday } = useMealsNav();

  const showBack = location.pathname !== "/";
  const isRecipes = location.pathname.startsWith("/recipes");
  const isMeals = location.pathname === "/meals";

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

      {isMeals && (
        <div className="flex-1 flex justify-end">
          <button
            onClick={jumpToToday}
            className="bg-primary text-black px-4 py-1 rounded font-semibold border border-blue-600 hover:bg-blue-700 ml-2"
          >
            Today
          </button>
        </div>
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
