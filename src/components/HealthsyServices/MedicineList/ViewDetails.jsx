import React, { useState, useEffect } from "react";
import ImageModal from "../../../common/ImageView";
import {
  getMedicineById,
} from "../../../api/HealthSyServicesApi";

function ViewDetails({ id, setIsOpenView }) {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [medicines, setMedicines] = useState();

  const onClose = () => {
    setIsOpenView(null);
  };

  const onCloseImageModal = () => {
    setOpenImageModal(false);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await getMedicineById(id);
        setMedicines(res.data);
      } catch (error) {
        console.error("Error fetching APIs:", error);
      }
    };
    fetchOptions();
  }, []);

  const medicineDetails = [
    { label: "Medicine Name", value: medicines?.name },
    { label: "Package Description", value: medicines?.prescription_type },
    { label: "Type", value: medicines?.type },
    { label: "Stock", value: medicines?.stock },
    { label: "Prescription Mandate", value: medicines?.prescription_type },
    { label: "Status", value: medicines?.status },
  ];
  const manufactureDetails = [
    { label: "Manufacture", value: medicines?.manufacturer?.name },
    { label: "Manufacture Address", value: medicines?.manufacturer?.address },
    { label: "Coutry of Origin", value: medicines?.manufacturer?.country },
    {
      label: "Customer Care Email",
      value: medicines?.manufacturer?.customer_care_email,
    },
  ];
  const MRP_Other_Details = [
    { label: "MRP", value: medicines?.pricing?.mrp },
    { label: "Discount", value: medicines?.pricing?.discount },
    { label: "Quantity", value: medicines?.pricing?.quantity },
    { label: "MRP Per Unit", value: medicines?.pricing?.mrp_per_unit },
    { label: " Unit", value: medicines?.pricing?.unit },
    {
      label: "Returnable",
      value: medicines?.pricing?.return_policy?.returnable,
    },
    {
      label: "Return Window",
      value: medicines?.pricing?.return_policy?.return_window,
    },
    {
      label: "Open Box Delivery",
      value: medicines?.pricing?.return_policy?.open_box,
    },
  ];
  const MoleculesDetails = [
    {
      label: "Salt/Molecule",
      value: medicines?.molecule_details?.salt_molecule,
    },
    {
      label: "Therapeutic Classification",
      value: medicines?.molecule_details?.therapeutic_classification,
    },
    {
      label: "Therapeutic Uses",
      value: medicines?.molecule_details?.therapeutic_uses,
    },
  ];
  const FadData = [
    {
      label: "Description",
      value: medicines?.faq?.faq_description?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Warning and precaution",
      value:
        medicines?.faq?.warning_and_precaution?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Direnction and uses",
      value: medicines?.faq?.direction_uses?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Side Effects",
      value: medicines?.faq?.side_effect?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Storage",
      value: medicines?.faq?.storage_disposal?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Dosage",
      value: medicines?.faq?.dosage?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Reference",
      value: medicines?.faq?.reference?.replace(/<\/?p>/g, "") || "",
    },
    {
      label: "Auther Details",
      value: medicines?.faq?.author_details?.replace(/<\/?p>/g, "") || "",
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-full max-w-2xl max-h-[650px] bg-white shadow-lg rounded-2xl relative overflow-hidden">
        <div className="w-full flex justify-between items-center border-[#E7E7EB] border-b-[1px] bg-white sticky top-0 z-10">
          <h3 className="text-lg text-[#000000] font-bold p-5 ml-4">
            {medicines?.name}
          </h3>
          <button onClick={onClose} className="mr-6">
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

        <div className=" p-2 w-full rounded-lg sticky top-[48px] z-10">
          <div className="flex w-full p-1 bg-[#F9F9FC]">
            <button
              className={`py-4 px-4 w-full text-[18px] font-Mulish ${
                activeTab === "details"
                  ? "bg-white shadow-md w-full border rounded-md text-primary"
                  : "text-[#4D4D4D]"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Medicine Details
            </button>

            <button
              className={`py-4 w-full px-4 text-[18px] font-Mulish ${
                activeTab === "faq"
                  ? "bg-white shadow-md w-full border rounded-md text-primary"
                  : "text-[#4D4D4D]"
              }`}
              onClick={() => setActiveTab("faq")}
            >
              FAQ & Others
            </button>
          </div>
        </div>

        <div className="overflow-auto scroll-2 max-h-[500px] p-4">
          {activeTab === "details" && (
            <>
              <div className="details-content border-b-[1px] w-full p-2">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  Medicine Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  {medicineDetails.map((detail, index) => (
                    <div key={index} className="flex">
                      <div className="w-[38%] font-Mulish justify-start ">
                        <span className="text-[16px] text-[#4D4D4D]">
                          {detail.label}
                        </span>
                      </div>
                      <div className="w-1/2 justify-start ">
                        <h1 className="text-base font-Mulish font-medium text-[#181423]">
                          {detail.value}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 p-2 border-b-[1px]">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  Medicine Images
                </h4>
                <div className="flex gap-6 ">
                  {medicines?.images.map((item, index) => (
                    <div
                      key={index}
                      className="w-auto border-b-[1px] h-auto p-3 bg-[#F5F5F5]"
                    >
                      <img
                        onClick={() => handleImageClick(medicines?.images)}
                        className="w-14 h-auto object-cover cursor-pointer"
                        src={item.url}
                        alt={`image-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="details-content border-b-[1px] w-full p-2">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  Manufacture Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  {manufactureDetails.map((detail, index) => (
                    <div key={index} className="flex">
                      <div className="w-[38%] font-Mulish justify-start ">
                        <span className="text-[16px] text-[#4D4D4D]">
                          {detail.label}
                        </span>
                      </div>
                      <div className="w-1/2 justify-start ">
                        <h1 className="text-base font-Mulish font-medium text-[#181423]">
                          {detail.value}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="details-content border-b-[1px] w-full p-2">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  MRP & Other Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  {MRP_Other_Details.map((detail, index) => (
                    <div key={index} className="flex">
                      <div className="w-[38%] font-Mulish justify-start ">
                        <span className="text-[16px] text-[#4D4D4D]">
                          {detail.label}
                        </span>
                      </div>
                      <div className="w-1/2 justify-start ">
                        <h1 className="text-base font-Mulish font-medium text-[#181423]">
                          {detail.value}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="details-content border-b-[1px] w-full p-2">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  Molecule & Other Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  {MoleculesDetails.map((detail, index) => (
                    <div key={index} className="flex">
                      <div className="w-[38%] font-Mulish justify-start ">
                        <span className="text-[16px] text-[#4D4D4D]">
                          {detail.label}
                        </span>
                      </div>
                      <div className="w-1/2 justify-start ">
                        <h1 className="text-base font-Mulish font-medium text-[#181423]">
                          {detail.value}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "faq" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ">
                {FadData.map((detail, index) => (
                  <>
                    <div key={index} className="flex border-b  p-2">
                      <div className="w-[38%] font-Mulish justify-start ">
                        <span className="text-[16px] text-[#4D4D4D]">
                          {detail.label}
                        </span>
                      </div>
                      <div className="w-1/2 justify-start border-r ">
                        <h1 className="text-[16px] font-Mulish font-medium text-[#181423]">
                          {detail.value}
                        </h1>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div>
                {medicines?.faq?.question_answers.length > 0 && (
                  <div className="p-2  rounded-lg ">
                    <h4 className="text-lg text-primary font-semibold mb-1  pb-2">
                      FAQ's
                    </h4>
                    <ul className="space-y-3 ">
                      {medicines?.faq?.question_answers.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 bg-white rounded-lg  flex flex-col gap-2"
                        >
                          <span className=" font-Mulish text-gray-600 font-medium">
                            <strong>{index + 1}:</strong> {item.question}
                          </span>
                          <span className="font-medium font-Mulish pl-1  text-gray-700">
                            {item.answer}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {openImageModal && selectedImage && (
        <ImageModal selectedImage={selectedImage} onClose={onCloseImageModal} />
      )}
    </div>
  );
}

export default ViewDetails;
