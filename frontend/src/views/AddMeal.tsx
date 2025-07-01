import AllRecipesFilter from "../components/AllRecipesFilter";
import { useLocation } from "react-router-dom";

const AddMeal = () => {
  const location = useLocation();
  const date = location.state?.date;
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-bold tracking-tight">Select a Recipe to Add</h1>
          {formattedDate && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {formattedDate}
            </span>
          )}
        </div>
        <AllRecipesFilter date={date} />
  
    </div>
  );
};

export default AddMeal;
