import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealCard from "../components/MealCard";
import RectAddMealButton from "../components/RectAddMealButton";
import DateSelector from "../components/DateSelector";

interface Meal {
  id: string;
  date: string; // ISO date string
  mealType: "breakfast" | "lunch" | "dinner";
  recipeId: { image: string; title: string; _id: string };
  isCooked: boolean;
}

// Helper to get an array of dates (2 previous, today, 5 next)
function getDateRange(center: Date, before: number, after: number): Date[] {
  const dates: Date[] = [];
  for (let i = -before; i <= after; i++) {
    const d = new Date(center);
    d.setDate(center.getDate() + i);
    dates.push(d);
  }
  return dates;
}

// Helper to format date as e.g. Mon, Jun 30
function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const Meals = () => {
  const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>({});
  // const [centerDate, setCenterDate] = useState<Date>(new Date()); // Dynamic today
  const [centerDate, setCenterDate] = useState<Date>(
    new Date("2025-06-30T00:00:00.000Z")
  ); // Hardcoded today for development
  const [dates, setDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const range = getDateRange(centerDate, 2, 5);
    setDates(range);
  }, [centerDate]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/meals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch meals");
        return res.json();
      })
      .then((meals: Meal[]) => {
        // Group meals by date string
        const mealsMap: Record<string, Meal[]> = {};
        meals.forEach((meal) => {
          const dateStr = new Date(meal.date).toDateString();
          if (!mealsMap[dateStr]) mealsMap[dateStr] = [];
          mealsMap[dateStr].push(meal);
        });
        setMealsByDate(mealsMap);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    setCenterDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() - 1);
      return d;
    });
  };
  const handleNext = () => {
    setCenterDate((prev) => {
      const d = new Date(prev);
      d.setDate(prev.getDate() + 1);
      return d;
    });
  };

  return (
    <div className="p-4 sm:p-6">
      {loading ? (
        <div>Loading meals...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="space-y-10">
          {dates.map((date) => {
            const meals = mealsByDate[date.toDateString()] || [];
            const isScrollable = meals.length > 2;
            return (
              <section key={date.toDateString()} className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2 m-0">
                    {formatDate(date)}
                    {date.toDateString() === new Date().toDateString() && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Today
                      </span>
                    )}
                  </h2>
                  <RectAddMealButton
                    onClick={() => navigate("/meals/add")}
                    label="Add Meal"
                  />
                </div>
                <div className={isScrollable ? "relative" : undefined}>
                  <div
                    className={
                      isScrollable
                        ? "flex gap-6 sm:gap-8 overflow-x-auto pb-2 scroll-smooth touch-pan-x hide-scrollbar"
                        : "grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
                    }
                    style={
                      isScrollable ? { WebkitOverflowScrolling: "touch" } : {}
                    }
                  >
                    {meals.map((meal) => (
                      <div
                        key={meal.id + date.toDateString()}
                        className={isScrollable ? "flex-shrink-0" : ""}
                        onClick={() => navigate(`/meals/${meal.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <MealCard
                          id={meal.id}
                          image={meal.recipeId?.image}
                          title={
                            meal.recipeId?.title || meal.recipeId?._id || "Meal"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
      <div
        className="fixed bottom-0 left-0 w-full flex justify-center z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95) 80%, transparent)",
        }}
      >
        <div className="pointer-events-auto pb-2 mb-2">
          <DateSelector
            centerDate={centerDate}
            setCenterDate={setCenterDate}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Meals;
