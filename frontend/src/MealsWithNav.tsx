import { useRef, useState } from "react";
import { MealsNavContext } from "./context/MealsNavContext";
import Meals from "./views/Meals";

export default function MealsWithNav() {
  const navHandlers = useRef({});
  const [handlers, setHandlers] = useState({});
  return (
    <MealsNavContext.Provider value={handlers}>
      <Meals setNavHandlers={setHandlers} />
    </MealsNavContext.Provider>
  );
}
