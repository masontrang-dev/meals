import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Meals", path: "/meals" },
  { name: "Recipes", path: "/recipes" },
];

export default function FooterNav() {
  const location = useLocation();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-surface border-t border-gray-200 z-50">
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
