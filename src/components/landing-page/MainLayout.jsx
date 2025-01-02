"use client";

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Breadcrumbs from "../../common/Breadcrumbs";
import Header from "./Header";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPopover, setIsSidebarPopover] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [authorized]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
        setIsSidebarPopover(false);
      } else if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
        setIsSidebarPopover(true);
      } else {
        setIsSidebarOpen(false);
        setIsSidebarPopover(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden bg-body_color">
      <Header
        toggleSidebar={toggleSidebar}
        setIsSidebarPopover={setIsSidebarPopover}
        isSidebarPopover={isSidebarPopover}
      />
      <div className="flex flex-1 overflow-hidden">
        {authorized && (
          <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              isSidebarPopover={isSidebarPopover}
            />
          </div>
        )}

        <div className="flex flex-col flex-1 overflow-hidden">
          <main
            className={`flex-1  overflow-y-auto hidescroll bg-[#fdfafa] ${
              authorized && "mt-24 p-4"
            } min-h-[300px]`}
          >
            {authorized && <Breadcrumbs />}

            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
