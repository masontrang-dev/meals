import { Link, useLocation } from "react-router-dom";

import { Home, Utensils, BookOpen } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Meals", path: "/meals", icon: Utensils },
  { name: "Recipes", path: "/recipes", icon: BookOpen },
];

export default function FooterNav() {
  const location = useLocation();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white bg-opacity-100 border-t border-gray-200 z-50 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)]">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex-1 text-center py-2 px-4 transition-colors duration-150 flex flex-col items-center justify-center rounded-md ${
                isActive
                  ? "text-primary font-bold bg-primary/10"
                  : "text-muted hover:text-primary font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${
                isActive ? "text-primary" : "text-muted group-hover:text-primary"
                 }`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
