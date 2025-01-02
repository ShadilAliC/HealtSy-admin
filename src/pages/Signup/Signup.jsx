import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import banner from "../../../public/images/auth/banner.svg";
import { ProgressBar } from "../../components/ui/ProgressBar";

export default function RegistrationPage() {
  const location = useLocation();

  const getCurrentStep = () => {
    if (location.pathname.includes("other-information")) {
      return 3;
    } else if (
      location.pathname.includes("pharmacy-license-and-location-details")
    ) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-normal mt-24">
      {/* Banner Section */}
      <div className="w-full">
        <img
          className="w-full h-auto object-cover"
          src={banner}
          alt="Banner"
          width={1920}
          height={400}
          priority
        />
      </div>

      {/* Main Content Section */}
      <div className="flex justify-center items-center w-full -mt-20 p-8 md:p-5">
        <div className="bg-white flex flex-col justify-center items-center w-full max-w-[87%] h-fit min-h-32 rounded-lg shadow-xl p-5">
          {/* Progress Bar */}
          <div className="w-full p-3">
            <ProgressBar currentStep={getCurrentStep()} />
          </div>

          {/* Outlet Content */}
          <div className="flex border-t border-black w-full justify-center items-center sm:w-[93%] pt-6 mt-6">
            {/* Ensure Outlet inputs are interactive */}
            <div className="relative z-10 w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
