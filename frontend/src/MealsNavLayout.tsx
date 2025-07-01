import { useState } from "react";
import { MealsNavContext } from "./context/MealsNavContext";
import MainLayout from "./layout/MainLayout";
import Meals from "./views/Meals";

export default function MealsNavLayout() {
  const [handlers, setHandlers] = useState<{ jumpToToday?: () => void }>({});
  return (
    <MealsNavContext.Provider value={handlers}>
      <MainLayout>
        <Meals setNavHandlers={setHandlers} />
      </MainLayout>
    </MealsNavContext.Provider>
  );
}
