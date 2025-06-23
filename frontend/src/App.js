import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Meals from "./views/Meals";
import NotFound from "./views/NotFound";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="meals" element={<Meals />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
