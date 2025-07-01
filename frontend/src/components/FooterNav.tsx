import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Meals", path: "/meals" },
  { name: "Recipes", path: "/recipes" },
];

export default function FooterNav() {
  const location = useLocation();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white bg-opacity-100 border-t border-gray-200 z-50 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)]">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex-1 text-center py-2 px-4 font-medium transition-colors duration-150 ${
              location.pathname === item.path
                ? "text-primary"
                : "text-muted hover:text-primary"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
