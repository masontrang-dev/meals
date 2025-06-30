import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navbar-logo">Meals App</div>
          <div className="navbar-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              to="/meal"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Meals
            </NavLink>
            <NavLink
              to="/editmeal"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Edit Meal
            </NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Meals App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
