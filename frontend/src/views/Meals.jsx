import { useEffect, useState } from "react";
// import { getMeals } from "../services/mealsService";
// import MealCard from "../components/MealCard";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // getMeals().then(setMeals);
  }, []);

  return (
    <div className="meals">
      MEALS PAGE
      {/* {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))} */}
    </div>
  );
}
