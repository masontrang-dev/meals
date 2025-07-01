import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./views/Recipes";

import NotFound from "./views/NotFound";
import Home from "./views/Home";
import MainLayout from "./layout/MainLayout";
import Meals from "./views/Meals";
import Meal from "./views/Meal";

import ViewRecipe from "./views/ViewRecipe";
import EditRecipe from "./views/EditRecipe";
import EditMeal from "./views/EditMeal";
import ViewMeal from "./views/ViewMeal";
import AddMeal from "./views/AddMeal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="meals" element={<Meals />} />
          <Route path="meals/add" element={<AddMeal />} />
          <Route path="meals/:id/edit" element={<EditMeal />} />
          <Route path="meals/:id" element={<ViewMeal />} />
          <Route path=":meal" element={<Meal />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/add" element={<EditRecipe />} />
          <Route path="recipes/:id/edit" element={<EditRecipe />} />
          <Route path="recipes/:id" element={<ViewRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
