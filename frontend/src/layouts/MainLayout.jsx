import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Navbar/Sidebar";
import Navbar from "../components/Navbar/Nav";
import AskCravio from "../components/AI/AskCravio";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* ================= MAIN AREA ================= */}
      <div className="ml-0 min-[721px]:ml-60">

        {/* Navbar */}
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
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