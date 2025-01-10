import React, { useEffect, useState } from "react";
import { useMastersContext } from "../../../context/MastersContext";
import FAQ from "./FAQDetails";
import MedicineDetails from "./MedicineDetails";
import { getMedicineById } from "../../../api/HealthSyServicesApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMedicineInfo } from "../../../redux/Slices/MedicineSlice";

function EditMedicine() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setAddAction } = useMastersContext();
  const [medicines, setMedicines] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("medicine");

  useEffect(() => {
    setAddAction("Order Medicines / Edit Medicine");
    const fetchMedicine = async () => {
      try {
        setIsLoading(true);
        const res = await getMedicineById(id);
        setMedicines(res.data);
        dispatch(setMedicineInfo(res.data));
      } catch (error) {
        console.error("Error fetching medicine:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedicine();
  }, [id, dispatch, setAddAction]);

  const renderTabContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!medicines) {
      return <div>No medicine data available.</div>;
    }

    switch (selectedTab) {
      case "medicine":
        return (
          <MedicineDetails
            setSelectedTab={setSelectedTab}
            medicineData={medicines}
            status="edit"
          />
        );
      case "faq":
        return (
          <FAQ
            setSelectedTab={setSelectedTab}
            medicineData={medicines}
            status="edit"
          />
        );
      default:
        return <MedicineDetails medicineData={medicines} status="edit" />;
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
        <div className="min-w-full">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default EditMedicine;
