import React, { useEffect, useState } from "react";
import CurrentTime from "../../common/CurrentTime";
import admin from "../../../src/assets/admin.png";

function Header({ toggleSidebar, setIsSidebarPopover, isSidebarPopover }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [authorized, setAuthorized] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setAuthorized(true);
  //   } else {
  //     setAuthorized(false);
  //   }
  // }, [authorized]);

  // const handleLogout = async () => {
  //   try {
  //     localStorage.removeItem("authToken"); 
  //     window.location.reload(); 
  //   } catch (err) {
  //     console.error("Error handling logout:", err);
  //   }
  // };

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">
      <div className="w-full flex items-center justify-between h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <button
            className="mr-1 p-1  rounded-md text-gray-500 lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            width={100}
            height={40}
            className="h-8 mr-14 lg:ml-12 w-auto sm:h-10 md:h-12"
          />
        </div>
        {/* {authorized && ( */}
          <div className="flex items-center space-x-4">
            <div className=" font-Mulish">
              <CurrentTime />
            </div>
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={admin}
                  alt="User avatar"
                  width={48}
                  height={48}
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-[#FFD023] rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                 onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        {/* // )} */}
      </div>
    </div>
  );
}

export default Header;

