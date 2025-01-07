"use client";

import React, { useState } from "react";
import { XIcon } from "lucide-react";

const ConfirmationModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-sans">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#FAE8EF] flex items-center justify-center relative">
            <svg
              width="38"
              height="38"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
            >
              <path
                d="M12.7411 1.31268C6.42989 1.31268 1.3125 6.43007 1.3125 12.7413C1.3125 19.0524 6.42989 24.1698 12.7411 24.1698C19.0523 24.1698 24.1696 19.0524 24.1696 12.7413C24.1696 6.43007 19.0523 1.31268 12.7411 1.31268Z"
                stroke="#CB1B5B"
                stroke-width="1.52381"
                stroke-miterlimit="10"
              />
            </svg>
            <span className="text-[#CB1B5B] text-2xl font-bold font-mono">
              i
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-xl text-gray-800 font-semibold mb-2">
            Bulk Download Confirmation
          </h4>
          <p className="text-sm text-[#4D4D4D]">
            To proceed with the bulk download, please enter your username and
            password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-[#FAFAFA] text-gray-800 w-full text-sm border border-gray-300 focus:border-[#CB1B5B] focus:ring-[#CB1B5B] outline-none rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 bg-[#FAFAFA] text-gray-800 w-full text-sm border border-gray-300 focus:border-[#CB1B5B] focus:ring-[#CB1B5B] outline-none rounded-lg"
            />
          </div>

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#CB1B5B] text-[#CB1B5B] rounded-lg hover:bg-[#FAE8EF] transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#CB1B5B] text-white rounded-lg hover:bg-[#B0164E] transition-colors duration-300"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationModal;
