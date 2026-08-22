import { Outlet } from "react-router-dom";

import Sidebar from "../components/Navbar/Sidebar";
import Navbar from "../components/Navbar/Nav";

function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="ml-0 min-[721px]:ml-60">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;