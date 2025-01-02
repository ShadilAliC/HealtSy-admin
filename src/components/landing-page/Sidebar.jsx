import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { menuItems } from "../../config/main-menu";

const Sidebar = ({ isOpen, toggleSidebar, isSidebarPopover }) => {
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        toggleSidebar(true);
      } else {
        toggleSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpenSubmenus([]);
    if (window.innerWidth < 768) {
      toggleSidebar(false);
    }
  }, [location]);

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const renderMenuItem = (item, depth = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = openSubmenus.includes(item.title);
    const isActive = location.pathname === item.path;

    return (
      <li
        key={item.title}
        className={`mb-2 ${
          isSidebarPopover ? "w-full flex justify-center" : ""
        }`}
      >
        {hasSubmenu && !isSidebarPopover ? (
          <div className="hover:scale-100 transition-transform  ">
            <button
              onClick={() => toggleSubmenu(item.title)}
              className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-md  ${
                isOpen
                  ? "bg-primary text-white"
                  : "text-text_color hover:bg-primary hover:text-white"
              }`}
              style={{ paddingLeft: `${depth * 1}rem` }}
            >
              <span className="flex items-center ">
                {item.icon && <item.icon className="w-7 h-7 pl-2 mr-3" />}
                <span className="text-sm font-medium">{item.title}</span>
              </span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {isOpen && (
              <ul className="mt-2 space-y-1 ml-6">
                {item.submenu.map((subItem) =>
                  renderMenuItem(subItem, depth + 1)
                )}
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center px-4 py-3 text-sm rounded-md w-full  ${
              isActive
                ? "bg-primary text-white"
                : "text-text_color hover:bg-primary hover:text-white"
            } ${isSidebarPopover ? "w-12 h-12" : ""}`}
            style={{ paddingLeft: `${depth * 1}rem` }}
          >
            {item.icon && (
              <item.icon
                className={`w-7 h-7 pl-2  ${isSidebarPopover ? "" : "mr-3"}`}
              />
            )}
            {!isSidebarPopover && (
              <span className="font-medium ">{item.title}</span>
            )}
          </button>
        )}
      </li>
    );
  };

  return (
    <>
      <aside
        className={`fixed z-50 left-0 h-full bg-bodybg_color p-4 text-gray-100 font-Mulish rounded-md shadow-xl ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:mt-24 lg:relative lg:translate-x-0 ${
          isSidebarPopover ? "w-16" : "w-[280px]"
        } mt-0 transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex ${
              isSidebarPopover ? "justify-center" : "justify-end"
            } items-center`}
          >
            {!isSidebarPopover && (
              <button
                className="lg:hidden text-gray-300 hover:text-white"
                onClick={() => toggleSidebar(false)}
                aria-label="Close Sidebar"
              >
                <X className="h-6 w-6 text-primary" />
              </button>
            )}
          </div>

          <nav className="flex-1 pb-6 overflow-y-auto">
            <ul
              className={`  ${
                isSidebarPopover ? " w-full flex flex-col items-center" : ""
              }`}
            >
              {menuItems.map((item) => renderMenuItem(item))}
            </ul>
          </nav>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
