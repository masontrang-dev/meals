import { createContext, useContext } from "react";

interface MealsNavContextType {
  jumpToToday?: () => void;
  loadPrevious?: () => void;
}

export const MealsNavContext = createContext<MealsNavContextType>({});

export const useMealsNav = () => useContext(MealsNavContext);
