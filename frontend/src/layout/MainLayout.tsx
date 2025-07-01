import { Outlet, useLocation } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import HeaderNav from "../components/HeaderNav";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  // Hide header nav on index route ("/")
  const hideHeaderNav = location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
      {!hideHeaderNav && (
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <HeaderNav />
          </div>
        </header>
      )}
      <main className="flex-1 container mx-auto px-6 py-2">
        {children || <Outlet />}
      </main>
      <FooterNav />
    </div>
  );
};

export default MainLayout;
