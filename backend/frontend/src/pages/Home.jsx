import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-grow flex-col gap-4 md:flex-row h-full bg-customCharcoal">
      <aside
        className="w-full md:w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <main className="w-full md:w-3/4 lg:w-5/6 border border-gray-500 rounded-xl p-4 flex-grow flex flex-col">
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
