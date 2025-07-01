import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold text-indigo-600 tracking-tight">
            Meals App
          </div>
          <div className="flex gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700"
                }`
              }
            >
              Meals
            </NavLink>{" "}
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700"
                }`
              }
            >
              Recipes
            </NavLink>
            {/* <NavLink
              to="/editmeal"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700"
                }`
              }
            >
              Edit Meal
            </NavLink> */}
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-6 py-2">
        <Outlet />
      </main>

      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Meals App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
