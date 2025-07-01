import { Outlet } from "react-router-dom";
import FooterNav from "../components/FooterNav";
import HeaderNav from "../components/TopNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
      {/* Header remains for top nav/actions */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* <div className="text-2xl font-bold text-indigo-600 tracking-tight">
            Meals App
          </div> */}
          <HeaderNav />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-2">
        <Outlet />
      </main>

      <FooterNav />
    </div>
  );
};

export default MainLayout;
