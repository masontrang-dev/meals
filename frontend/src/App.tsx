import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Meal from "./views/Meal";
import NotFound from "./views/NotFound";
import MainLayout from "./layout/MainLayout";
import EditMeal from "./views/EditMeal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="meal" element={<Meal />} />
          <Route path="editmeal" element={<EditMeal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
