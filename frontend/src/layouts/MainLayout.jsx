import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Navbar/Sidebar";
import Navbar from "../components/Navbar/Nav";
import AskCravio from "../components/Ai/AskCravio";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide global search bar on restaurant detail page
  const isRestaurantDetailsPage =
    location.pathname === "/restaurantdetail";

  return (
    <div className="min-h-screen bg-surface">

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* ================= MAIN AREA ================= */}
      <div className="ml-0 min-[721px]:ml-60">

        {/* ================= NAVBAR ================= */}
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          showSearch={!isRestaurantDetailsPage}
        />

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

      {/* ================= ASK CRAVIO AI ================= */}
      <AskCravio />

    </div>
  );
}

export default MainLayout;