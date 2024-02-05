import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="container mx-auto overflow-x-hidden">
        <div className="h-[100vh] grid grid-cols-[24rem,1fr] grid-rows-[auto,1fr] bg-white max-xl:flex max-xl:flex-col">
          <Sidebar />
          <Header />
          <main className="py-8 px-8 overflow-y-scroll bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
