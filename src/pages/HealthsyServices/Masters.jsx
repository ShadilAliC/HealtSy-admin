import React, { useEffect } from "react";

import { useMastersContext } from "../../context/MastersContext";
import ManufacturerList from "../../components/HealthsyServices/Masters/ManufacturerList ";
import Salt from "../../components/HealthsyServices/Masters/Salt/Salt";
import Unit from "../../components/HealthsyServices/Masters/Unit";


function Masters() {
  const { selectedTab, setSelectedTab } = useMastersContext();

  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("manufacturer");
    }
  }, [selectedTab]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "manufacturer":
        return <ManufacturerList />;
      case "salt":
        return <Salt />;
      case "unit":
        return <Unit />;
      case "productType":
        return <ProductType />;
      default:
        return <ManufacturerList />;
    }
  };

  const tabs = [
    { id: "manufacturer", label: "Manufacturer List" },
    { id: "salt", label: "Salt / Molecule" },
    { id: "unit", label: "Unit" },
    { id: "productType", label: "Product Type" },
  ];

  return (
    <div className="p-2 sm:p-4">
      <div className="overflow-x-auto">
        <div className="flex mb-4 w-full min-w-max h-[60px] items-center rounded-md bg-body_color">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex py-2 px-2 sm:py-4 sm:px-3 text-center text-xs sm:text-sm md:text-base whitespace-nowrap transition-colors duration-200 ${
                selectedTab === tab.id
                  ? "border-b-4 border-spacing-3 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-full">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default Masters;

