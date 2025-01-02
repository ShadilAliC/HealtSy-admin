import React from "react";

export function ProgressBar({ currentStep }) {
  const steps = [
    {
      path: "/healthsy-partnered-doctors-network-programme/doctor-registration",
      label: "Personal Details",
    },
    {
      path: "/healthsy-partnered-doctors-network-programme/doctor-registration/pharmacy-license-and-location-details",
      label: "License & Location",
    },
    {
      path: "/healthsy-partnered-doctors-network-programme/doctor-registration/other-information",
      label: "Other Information",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.path}>
            <div className="w-full flex items-center justify-center relative">
              {index > 0 && (
                <div
                  className={`absolute w-full border-t-2 ${
                    index + 1 <= currentStep
                      ? "border-dashed border-[#CB1B5B]"
                      : "border-dashed border-[#E2E8F0]"
                  }`}
                  style={{
                    left: "-50%",
                    right: "50%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              )}

              <div
                className={`flex justify-center items-center w-12 h-12 rounded-full text-white font-medium z-10 ${
                  index + 1 <= currentStep ? "bg-[#CB1B5B]" : "bg-[#D4D4D4]"
                }`}
              >
                {index + 1}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`absolute w-full border-t-2 ${
                    index + 1 < currentStep
                      ? "border-dashed border-[#CB1B5B]"
                      : "border-dashed border-[#E2E8F0]"
                  }`}
                  style={{
                    left: "50%",
                    right: "-50%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
