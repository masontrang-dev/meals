import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealCard from "../components/MealCard";
import RectAddMealButton from "../components/RectAddMealButton";

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

interface MealsNavHandlers {
  jumpToToday?: () => void;
  loadPrevious?: () => void;
}

const Meals = ({
  setNavHandlers,
}: {
  setNavHandlers?: (handlers: MealsNavHandlers) => void;
}) => {
  const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>({});
  const [dates, setDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLDivElement | null>(null);

  // Helper to fetch meals for a range of dates
  const fetchMealsForDates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/meals");
      if (!res.ok) throw new Error("Failed to fetch meals");
      const meals: Meal[] = await res.json();
      const mealsMap: Record<string, Meal[]> = {};
      meals.forEach((meal) => {
        const dateStr = new Date(meal.date).toDateString();
        if (!mealsMap[dateStr]) mealsMap[dateStr] = [];
        mealsMap[dateStr].push(meal);
      });
      setMealsByDate((prev) => ({ ...prev, ...mealsMap }));
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize with June 30, 2025 for development. To use real today, uncomment the lines below.
  useEffect(() => {
    // const today = new Date(); // <-- Use this for real today
    const today = new Date("2025-06-30T00:00:00"); // <-- Hardcoded for dev
    const initialDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      initialDates.push(d);
    }
    setDates(initialDates);
    fetchMealsForDates();
  }, [fetchMealsForDates]);

  // Infinite scroll: load more future days when bottomRef is visible
  useEffect(() => {
    if (!bottomRef.current) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !isFetchingMore) {
        setIsFetchingMore(true);
        // Add 5 more next days
        setDates((prev) => {
          const last = prev[prev.length - 1];
          const moreDates = [];
          for (let i = 1; i <= 5; i++) {
            const d = new Date(last);
            d.setDate(last.getDate() + i);
            moreDates.push(new Date(d));
          }
          fetchMealsForDates();
          setIsFetchingMore(false);
          return [...prev, ...moreDates];
        });
      }
    });
    observer.current.observe(bottomRef.current);
    return () => observer.current?.disconnect();
  }, [loading, isFetchingMore, fetchMealsForDates]);

  // Load previous days (before the first date in the list)
  const loadPrevious = useCallback(() => {
    setIsFetchingMore(true);
    setDates((prev) => {
      const first = prev[0];
      const moreDates: Date[] = [];
      for (let i = 1; i <= 5; i++) {
        const d = new Date(first);
        d.setDate(first.getDate() - i);
        moreDates.unshift(new Date(d));
      }
      fetchMealsForDates();
      setIsFetchingMore(false);
      return [...moreDates, ...prev];
    });
  }, [fetchMealsForDates]);

  // Jump to today
  const jumpToToday = useCallback(() => {
    if (todayRef.current) {
      const yOffset = -80; // adjust for sticky header/footer
      const y =
        todayRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (setNavHandlers) {
      setNavHandlers({ jumpToToday }); // Only provide jumpToToday to header
    }
  }, [jumpToToday, setNavHandlers]);

  return (
    <div className="p-2 sm:p-2 relative">
      <button
        onClick={loadPrevious}
        className="block mx-auto mb-4 bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300"
      >
        Load Previous
      </button>
      {loading ? (
        <div>Loading meals...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="space-y-10">
          {dates.map((date, idx) => {
            const meals = mealsByDate[date.toDateString()] || [];
            const isScrollable = meals.length > 2;
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div
                ref={isToday ? todayRef : undefined}
                key={date.toDateString()}
              >
                <section className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold flex items-center gap-2 m-0">
                      {formatDate(date)}
                      {isToday && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Today
                        </span>
                      )}
                    </h2>
                    <RectAddMealButton
  onClick={() => navigate("/meals/add", { state: { date } })}
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
                              meal.recipeId?.title ||
                              meal.recipeId?._id ||
                              "Meal"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {idx < dates.length - 1 && (
                  <hr className="my-6 border-t border-gray-200" />
                )}
              </div>
            );
          })}
          <div ref={bottomRef} className="h-8"></div>
          {isFetchingMore && (
            <div className="text-center py-4">Loading more…</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Meals;
