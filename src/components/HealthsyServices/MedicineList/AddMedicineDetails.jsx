import React, { useState } from "react";
import MandatoryField from "../../../common/MandatoryField";
import { Plus } from "lucide-react";
import UploadLoader from "../../ui/UploadLaoder";
import UploadImagePreview from "../../ui/UploadImagePreview";
import VariantForm from "../../ui/RenderVariantForm";
import upload from "../../../assets/svg/upload.svg";

function MedicineDetails({ setSelectedTab }) {
  const [images, setImages] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [imageCount, setImageCount] = useState();
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    upload: true,
    manufacturer: false,
    mrp: false,
    molecule: false,
  });
  const [variants, setVariants] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    setImageCount(files.length);

    files.forEach((image, index) => {
      setTimeout(() => {
        setCurrentItem(index + 1);
      }, index * 1000);
    });

    setTimeout(() => {
      setImages((prevImages) => [...prevImages, ...files]);
      setLoading(false);
    }, 1500);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddNewVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      { id: prevVariants.length + 1 },
    ]);
  };
  const nextForm = () => {
    setSelectedTab("faq");
  };

  return (
    <div className="max-w-[90%] ">
      <form className="w-full max-w-7xl mx-auto">
        <div className="mb-4 p-3 bg-white">
          {expandedSections.upload && (
            <div className="bg-[#FAFAFA] rounded-b-[20px] p-7 pt-8 text-center text-lg">
              {images.length === 0 ? (
                <>
                  <span className="text-[#000000] text-[26px] font-medium">
                    Upload your images{" "}
                  </span>
                  <p className="mt-1.5 text-[14px] text-[#797979]">
                    Formats: PNG, JPG Max file size: 2mb
                  </p>
                  <div className="relative flex flex-col bg-[#FFFFFF] justify-center items-center gap-3 p-8 mt-[2.1875rem] rounded-[10px] border-2 border-dashed border-[#A6A6A6] text-[#444] cursor-pointer">
                    {loading ? (
                      <UploadLoader
                        currentItem={currentItem}
                        totalImages={imageCount}
                      />
                    ) : (
                      <>
                        <img src={upload} alt="" />
                        <span className="text-[#444] text-[21px] font-semibold text-center">
                          Drag & Drop your images here
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          multiple
                          id="file-input"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("file-input").click();
                          }}
                          className="mt-4 bg-[#FAE8EF] text-[#CB1B5B] font-Mulish font-medium px-6 py-2.5 rounded-[10px]"
                        >
                          Click to Browse
                        </button>{" "}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <UploadImagePreview
                    images={images}
                    setImages={setImages}
                    loading={loading}
                  />
                </>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="pharmacyName"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Medicine Name <MandatoryField />
              </label>
              <input
                type="text"
                id="pharmacyName"
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter your Pharmacy name"
              />
            </div>

            <div>
              <label
                htmlFor="email1"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Package Description <MandatoryField />
              </label>
              <input
                type="email"
                id="email1"
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter your email id"
              />
            </div>
            <div>
              <label
                htmlFor="email2"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Medicine Type <MandatoryField />
              </label>
              <input
                type="email"
                id="email2"
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter your email id"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Stock <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Available"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Available
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Not-Available"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Not Available
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Prescription Type <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Active"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Rx
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Non-Active"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Non-Rx
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Medicine Status <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Active"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Active
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-orange-600">
                  <input
                    type="radio"
                    name="medicineStatus"
                    value="Non-Active"
                    className="hidden peer"
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Non-Active
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("manufacturer")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              Manufacturer Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.manufacturer ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.manufacturer && (
            <div className="bg-white rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pharmacyName"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Select Manufacturer <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your Pharmacy name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Manufacturer Address <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter  Manufacturer Address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pharmacyName"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Country of Origin <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your  Country of Origin"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Customer Care Email <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("mrp")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              MRP & Other Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.mrp ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.mrp && (
            <div className="bg-white rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="pharmacyName"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    MRP <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your MRP"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Discount (%) <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter  Manufacturer Address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pharmacyName"
                    className="block mb-2 text-[14px font-Mulish text-[#000000]"
                  >
                    Quantity <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your  Country of Origin"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    MRP Per Unit <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Unit <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                    Returnable <MandatoryField />
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                      <input
                        type="radio"
                        name="medicineStatus"
                        value="Active"
                        className="hidden peer"
                      />
                      <span className="text-gray-900 peer-checked:text-primary ">
                        Returnable
                      </span>
                    </label>

                    <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                      <input
                        type="radio"
                        name="medicineStatus"
                        value="Non-Active"
                        className="hidden peer"
                      />
                      <span className="text-gray-900 peer-checked:text-primary">
                        Non-Returnable
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Return Window <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                    Open Box <MandatoryField />
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center justify-center w-16 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                      <input
                        type="radio"
                        name="medicineStatus"
                        value="Active"
                        className="hidden peer"
                      />
                      <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                        Yes
                      </span>
                    </label>

                    <label className="flex items-center justify-center w-16 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                      <input
                        type="radio"
                        name="medicineStatus"
                        value="Non-Active"
                        className="hidden peer"
                      />
                      <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                        No
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("molecule")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              Molecule & Other Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.molecule ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.molecule && (
            <div className="bg-white  rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="pharmacyName"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Salt/Molecule <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your Pharmacy name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email1"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Therapeutic Classification <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email1"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email2"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Therapeutic Uses <MandatoryField />
                  </label>
                  <input
                    type="email"
                    id="email2"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your email id"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {variants.map((variant) => (
          <VariantForm key={variant.id} variantId={variant.id} />
        ))}

        <div className="mt-6 flex">
          <button
            onClick={handleAddNewVariant}
            type="button"
            className="relative flex h-10 w-full sm:w-[150px] items-center justify-start border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
          >
            <span className="flex h-full w-[39px] items-center justify-center rounded-lg bg-btn_bg transition-all duration-300 active:bg-[#2e8644]">
              <Plus className="h-6 w-6 stroke-white stroke-2" />
            </span>
            <span className="flex font-Mulish text-white">
              Add New Variants
            </span>
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center mt-5 shadow-lg px-">
        <button
          onClick={nextForm}
          className="px-8 py-2.5 text-center bg-[#3B86FF] text-white rounded-lg shadow-md hover:bg-[#3275e8] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MedicineDetails;
