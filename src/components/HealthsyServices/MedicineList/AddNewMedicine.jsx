import React, { useEffect, useState } from "react";
import { useMastersContext } from "../../../context/MastersContext";
import MedicineDetails from "./MedicineDetails";
import FAQDetails from "./FAQDetails";

function AddNewMedicine() {
  const { setAddAction } = useMastersContext();
  const [selectedtap, setSelectedTab] = useState("medicine");
  useEffect(() => {
    setAddAction("Order Medicines / Add New Medicine");
  }, []);
  const renderTabContent = () => {
    switch (selectedtap) {
      case "medicine":
        return <MedicineDetails setSelectedTab={setSelectedTab} status={"add"} />;
      case "faq":
        return <FAQDetails setSelectedTab={setSelectedTab} status={"add"}/>;
      default:
        return <MedicineDetails status={"add"}/>;
    }
  };

  const tabs = [
    { id: "medicine", label: "Medicine Details " },
    { id: "faq", label: "FAQ & Others" },
  ];

  return (
    <div className="p-2 sm:p-4">
      <div className="overflow-x-auto">
        <div className="flex mb-4 w-full min-w-max h-[60px] items-center rounded-md bg-body_color">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex py-2 px-2 sm:py-4 sm:px-3 text-center text-xs sm:text-sm md:text-base whitespace-nowrap transition-colors duration-200 ${
                selectedtap === tab.id
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
        <div className="min-w-full">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AddNewMedicine;
