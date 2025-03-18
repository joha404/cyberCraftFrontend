import React from "react";
import SideNav from "../components/Navbar/SideNav";
import NavBar from "../components/Navbar/NavbarPage";
import DashBoard from "../views/Dashboard";

export default function Layout() {
  return (
    <>
      <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"></nav>
      <NavBar />
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-50 w-80 h-screen transition-transform -translate-x-full pl-12 pt-4 bg-white shadow-[1px_0_6px_rgba(0,0,0,0.1)] sm:translate-x-0 dark:bg-gray-800"
        aria-label="Sidebar"
      >
        <SideNav />
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 pl-28 h-screen w-full DashboardSection  mt-14">
          {/* <Dashboard /> */}
          <DashBoard />
        </div>
      </div>
    </>
  );
}
