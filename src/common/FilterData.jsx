import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import close from "../assets/svg/close.svg";
import filterIcon from "../assets/svg/filter.svg";
import {
  getManufacturer,
  getProductType,
  getSaltMolecule,
} from "../api/HealthSyServicesApi";

function FilterData({
  filterDropdown,
  isFilterOpen,
  setFilterData,
  applySort,
  filterData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Manufacturer");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const menu = [
    { name: "Manufacturer" },
    { name: "Salt" },
    { name: "Medicine Type" },
    { name: "Variant" },
    { name: "Prescription Type" },
    { name: "Status" },
  ];
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [saltMoleculeResponse, manufactureResponse, productTypeResponse] =
          await Promise.all([
            getSaltMolecule(),
            getManufacturer(),
            getProductType(),
          ]);
        const mockData = {
          Manufacturer: manufactureResponse.data.map((item) => item.name),
          Salt: saltMoleculeResponse.data.map((item) => item.name),
          "Medicine Type": productTypeResponse.data.map((item) => item.name),
          Variant: ["Variant", "Non-Variant"],
          "Prescription Type": ["Rx", "Non-Rx"],
          Status: ["Active", "In-Active"],
        };

        setAvailableOptions(mockData[selectedCategory] || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchOptions();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option) => {
    setAppliedFilters((prevFilters) => {
      if (
        ["Variant", "Prescription Type", "Status"].includes(selectedCategory)
      ) {
        const filteredPrevFilters = prevFilters.filter(
          (filter) => filter.category !== selectedCategory
        );

        return [
          ...filteredPrevFilters,
          { category: selectedCategory, value: option },
        ];
      } else {
        const existingFilterIndex = prevFilters.findIndex(
          (filter) =>
            filter.category === selectedCategory && filter.value === option
        );
        if (existingFilterIndex > -1) {
          return prevFilters.filter(
            (_, index) => index !== existingFilterIndex
          );
        } else {
          return [
            ...prevFilters,
            { category: selectedCategory, value: option },
          ];
        }
      }
    });
  };

  const handleRemoveFilter = (filterToRemove) => {
    setAppliedFilters(
      appliedFilters.filter(
        (filter) =>
          !(
            filter.category === filterToRemove.category &&
            filter.value === filterToRemove.value
          )
      )
    );
  };

  const handleClearAll = () => {
    setAppliedFilters([]);
  };

  const handleApply = () => {
    console.log("Applied filters:", appliedFilters);
    setFilterData(appliedFilters);
    toggleModal();
  };

  const handleReset = () => {
    setAppliedFilters([]);
    setSearchTerm("");
    setSelectedCategory("Manufacturer");
  };

  const filteredOptions = availableOptions.filter((option) => {
    if (typeof option === "string") {
      return option.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false; // Ignore non-string options
  });

  return (
    <div className="relative w-full ml-2 ">
      <button
        className="w-full sm:w-auto flex items-center justify-between px-5 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B]"
        onClick={toggleModal}
      >
        <span className="mr-2 font-Mulish text-[#4D4D4D]">Filter</span>
        <img src={filterIcon} alt="Filter Icon" className="mr-2" />
        <div className="w-5 h-5 rounded-full bg-[#CB1B5B] text-[#FFFFFF] flex items-center justify-center text-xs font-medium">
          {filterData.length}
        </div>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 p-4">
          <div className="w-full max-w-4xl bg-white rounded-md shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col">
            <div className="w-full flex justify-between items-center border-b-2 p-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={toggleModal}>
                <img src={close} alt="" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              <div className="w-full md:w-1/3 space-y-2 p-4 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto scroll-2">
                {menu.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-2 rounded-md cursor-pointer ${
                      selectedCategory === item.name
                        ? "bg-[#F5F5F5] text-[#000000]"
                        : "text-[#0d0d0d] hover:bg-[#F5F5F5] hover:text-[#000000]"
                    }`}
                    onClick={() => handleCategoryClick(item.name)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto scroll-2">
                <div className="relative w-full mb-4">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Search className="text-gray-500 w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 bg-[#F5F5F5] px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-transparent"
                    placeholder={`Search ${selectedCategory}`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto scroll-2">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 hover:bg-[#F5F5F5] rounded-md"
                    >
                      <div className="relative flex items-center justify-center font-poppins">
                        <input
                          id={`option-${index}`}
                          type={
                            ["Variant", "Prescription Type", "Status"].includes(
                              selectedCategory
                            )
                              ? "radio"
                              : "checkbox"
                          }
                          name={
                            ["Variant", "Prescription Type", "Status"].includes(
                              selectedCategory
                            )
                              ? "radioGroup"
                              : undefined
                          }
                          checked={appliedFilters.some(
                            (filter) =>
                              filter.category === selectedCategory &&
                              filter.value === option
                          )}
                          onChange={() => handleOptionClick(option)}
                          className={`peer h-4 w-4 appearance-none border border-gray-300 rounded ${
                            ["Variant", "Prescription Type", "Status"].includes(
                              selectedCategory
                            )
                              ? "rounded-full"
                              : "rounded"
                          } bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                        />
                        <svg
                          className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="6"
                            className={
                              [
                                "Variant",
                                "Prescription Type",
                                "Status",
                              ].includes(selectedCategory)
                                ? ""
                                : "hidden"
                            }
                          />
                          <polyline
                            points="20 6 9 17 4 12"
                            className={
                              [
                                "Variant",
                                "Prescription Type",
                                "Status",
                              ].includes(selectedCategory)
                                ? "hidden"
                                : ""
                            }
                          />
                        </svg>
                      </div>

                      <label
                        htmlFor={`option-${index}`}
                        className="w-full text-left cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/3 p-4 overflow-y-auto scroll-2">
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#E9E9E9] flex items-center justify-center text-xs font-medium">
                      {appliedFilters.length}
                    </div>
                    <p className="text-[#4D4D4D]">Filters Applied</p>
                  </div>
                  <button
                    className="text-[black] underline text-sm font-medium"
                    onClick={handleClearAll}
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(
                    appliedFilters.reduce((acc, filter) => {
                      if (!acc[filter.category]) {
                        acc[filter.category] = [];
                      }
                      acc[filter.category].push(filter.value);
                      return acc;
                    }, {})
                  ).map(([category, values]) => (
                    <div
                      key={category}
                      className="flex flex-col justify-between p-1 rounded-lg"
                    >
                      <h3>{category}</h3>
                      <div className="flex flex-wrap w-full items-center gap-2">
                        {values.map((value) => (
                          <span
                            key={value}
                            className="text-sm p-2 w-fit rounded-lg bg-[#FAE8EF] flex items-center gap-2"
                          >
                            {value}
                            <button
                              onClick={() =>
                                handleRemoveFilter({ category, value })
                              }
                              className="p-1 flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-[#CB1B5B]" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 w-full flex justify-end items-center space-x-4 border-t border-gray-200">
              <button
                className="px-4 py-2 border border-[#CB1B5B] text-[#CB1B5B] rounded-lg"
                onClick={handleReset}
              >
                Reset Filter
              </button>
              <button
                className="px-5 py-2.5 bg-[#CB1B5B] text-white rounded-lg"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterData;
