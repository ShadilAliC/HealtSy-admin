import React from "react";

function Success({ message}) {
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-[346px] bg-white shadow-lg rounded-lg p-6 relative">
        <div className="my-4 text-center w-full flex flex-col justify-center items-center">
          <div className="relative w-20 h-20">
            <svg
              className="absolute inset-0"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="37"
                stroke="#1AAA55"
                stroke-width="6"
              />
            </svg>

            <svg
              className="absolute inset-0 w-10 h-10 mx-auto my-auto"
              viewBox="0 0 37 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 14.9985L13 23.9985L34 2.99854"
                stroke="#1AAA55"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <h4 className="text-[#181423] text-[18px] font-Mulish font-medium mt-4">
            {message}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Success;
