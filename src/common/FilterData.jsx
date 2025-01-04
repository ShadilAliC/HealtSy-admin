import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";

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
      const mockData = {
        Manufacturer: ["Pfizer", "Johnson & Johnson", "Roche", "Novartis"],
        Salt: ["Acetaminophen", "Ibuprofen", "Aspirin", "Amoxicillin"],
        "Medicine Type": ["Tablet", "Capsule", "Syrup", "Injection"],
        Variant: ["10mg", "20mg", "30mg", "50mg"],
        "Prescription Type": [
          "OTC",
          "Prescription Only",
          "Controlled Substance",
        ],
        Status: ["In Stock", "Out of Stock", "Discontinued"],
      };
      setAvailableOptions(mockData[selectedCategory] || []);
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
      const existingFilterIndex = prevFilters.findIndex(
        (filter) =>
          filter.category === selectedCategory && filter.value === option
      );
      if (existingFilterIndex > -1) {
        return prevFilters.filter((_, index) => index !== existingFilterIndex);
      } else {
        return [...prevFilters, { category: selectedCategory, value: option }];
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
    toggleModal();
  };

  const handleReset = () => {
    setAppliedFilters([]);
    setSearchTerm("");
    setSelectedCategory("Manufacturer");
  };

  const filteredOptions = availableOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full ml-2 ">
      <button
        className="w-full sm:w-auto flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B]"
        onClick={toggleModal}
      >
        <span>Filter </span>
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9824 0.757568C10.4779 0.757568 9.2127 1.83595 8.9209 3.25757H0.732422C0.387247 3.25757 0.107422 3.53739 0.107422 3.88257C0.107422 4.22774 0.387247 4.50757 0.732422 4.50757H8.9209C9.2127 5.92919 10.4779 7.00757 11.9824 7.00757C13.4869 7.00757 14.7521 5.92919 15.0439 4.50757H16.9824C17.3276 4.50757 17.6074 4.22774 17.6074 3.88257C17.6074 3.53739 17.3276 3.25757 16.9824 3.25757H15.0439C14.7521 1.83595 13.4869 0.757568 11.9824 0.757568ZM11.9824 2.00757C13.0253 2.00757 13.8574 2.83965 13.8574 3.88257C13.8574 4.92549 13.0253 5.75757 11.9824 5.75757C10.9395 5.75757 10.1074 4.92549 10.1074 3.88257C10.1074 2.83965 10.9395 2.00757 11.9824 2.00757Z"
            fill="#4D4D4D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.73242 7.00757C4.22793 7.00757 2.9627 8.08595 2.6709 9.50757H0.732422C0.387247 9.50757 0.107422 9.78739 0.107422 10.1326C0.107422 10.4777 0.387247 10.7576 0.732422 10.7576H2.6709C2.9627 12.1792 4.22793 13.2576 5.73242 13.2576C7.23692 13.2576 8.50214 12.1792 8.79395 10.7576H16.9824C17.3276 10.7576 17.6074 10.4777 17.6074 10.1326C17.6074 9.78739 17.3276 9.50757 16.9824 9.50757H8.79395C8.50214 8.08595 7.23692 7.00757 5.73242 7.00757ZM5.73242 8.25757C6.77534 8.25757 7.60742 9.08965 7.60742 10.1326C7.60742 11.1755 6.77534 12.0076 5.73242 12.0076C4.6895 12.0076 3.85742 11.1755 3.85742 10.1326C3.85742 9.08965 4.6895 8.25757 5.73242 8.25757Z"
            fill="#4D4D4D"
          />
        </svg>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 p-4">
        <div className="w-full max-w-4xl bg-white rounded-md shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col">
          <div className="w-full flex justify-between items-center border-b-2 p-4">
            <h3 className="text-lg font-bold">Filters</h3>
            <button onClick={toggleModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z"
                    stroke="#4D4D4D"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M15 15L9 9M9 15L15 9"
                    stroke="#4D4D4D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
                          type="checkbox"
                          checked={appliedFilters.some(
                            (filter) =>
                              filter.category === selectedCategory &&
                              filter.value === option
                          )}
                          onChange={() => handleOptionClick(option)}
                          className="peer h-4 w-4 appearance-none border border-gray-300 rounded bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                          <polyline points="20 6 9 17 4 12"></polyline>
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
                  {appliedFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-[#FAE8EF] p-2 rounded-lg"
                    >
                      <span className="text-sm">
                        {filter.category}: {filter.value}
                      </span>
                      <button onClick={() => handleRemoveFilter(filter)}>
                        <X className="w-4 h-4 text-[#CB1B5B]" />
                      </button>
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
