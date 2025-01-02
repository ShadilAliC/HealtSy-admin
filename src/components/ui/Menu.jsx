import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { menuItems } from "../../config/main-menu";
import { Link } from "react-router-dom";

function Menu() {
  console.log('ksksksks');
  
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  return (
    <nav className="h-12 w-full bg-[#fff] text-[#CB1B5B] flex items-center justify-center px-4 shadow-md">
      <ul className="flex space-x-6">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              to={item.path}
              onClick={() => handleClick(index)}
              className={`text-lg  font-semibold flex items-center ${
                activeItem === index ? "text-[#CB1B5B]" : "text-black"
              } hover:text-[#CB1B5B]`}
            >
              {item.icon && <item.icon className="w-5 h-5 mr-2" />}
              <span>{item.title}</span>
              {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
            </Link>
            {item.submenu && (
              <ul className="absolute left-0 mt-2 space-y-2 bg-slate-700 text-white rounded-md shadow-lg p-2 hidden group-hover:block">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={subItem.path}
                      className="block px-4 py-2 hover:bg-slate-600 rounded-md"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
