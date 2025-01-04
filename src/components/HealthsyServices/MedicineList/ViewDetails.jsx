import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import test from "../../../assets/admin.png";
import para from "../../../assets/svg/par.svg";
import ImageModal from "../../../common/ImageView";

function ViewDetails({ setIsOpenView }) {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const onClose = () => {
    setIsOpenView(null);
  };

  const onCloseImageModal = () => {
    setOpenImageModal(false);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      // Fetch options logic here
    };
    fetchOptions();
  }, []);

  const medicineDetails = [
    { label: "Generic Name", value: "Paracetamol" },
    { label: "Brand Name", value: "Dolo 64" },
    { label: "Manufacturer", value: "Micro Labs Ltd" },
    { label: "Strength", value: "650 mg" },
    { label: "Dosage Form", value: "Tablet" },
    { label: "Pack Size", value: "15 tablets" },
  ];
  const FadData = [
    {
      label: "Description",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Warning and precaution",
      value:
        "The safety of using Dolo 650 Tablet while pregnant is not yet known. Please consult with your doctor.",
    },
    {
      label: "Direnction and uses",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Side Effects",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Storage",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Dosage",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Reference",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
    {
      label: "Auther Details",
      value:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
    },
  ];

  const imageArray = [para, para, para];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-full max-w-2xl max-h-[650px] bg-white shadow-lg rounded-2xl relative overflow-hidden">
        <div className="w-full flex justify-between items-center border-[#E7E7EB] border-b-[1px] bg-white sticky top-0 z-10">
          <h3 className="text-lg text-[#000000] font-bold p-5 ml-4">Dolo 64</h3>
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
              <div className="mt-3">
                <h4 className="text-lg text-primary font-semibold mb-4">
                  Medicine Images
                </h4>
                <div className="flex gap-6 ">
                  {imageArray.map((item, index) => (
                    <div key={index} className="w-auto h-auto p-3 bg-[#F5F5F5]">
                      <img
                        onClick={() => handleImageClick(imageArray)}
                        className="w-14 h-auto object-cover cursor-pointer"
                        src={item}
                        alt={`image-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "faq" && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ">
              {FadData.map((detail, index) => (
                <div key={index} className="flex p-2">
                  <div className="w-[38%] font-Mulish justify-start ">
                    <span className="text-[16px] text-[#4D4D4D]">
                      {detail.label}
                    </span>
                  </div>
                  <div className="w-1/2 justify-start ">
                    <h1 className="text-[16px] font-Mulish font-medium text-[#181423]">
                      {detail.value}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
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
