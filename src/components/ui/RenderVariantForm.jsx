import React, { useState } from 'react';
import DeleteSmModal from "./DeleteSmModal";
import MandatoryField from '../../common/MandatoryField';
import upload from '../../assets/svg/upload.svg'
const VariantForm = ({ variantId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [files, setFiles] = useState([]);

  const deleteVariant = () => {
    setIsOpenModal(true);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div key={variantId} className="mt-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-[18px] font-Mulish mb-6">Variant {variantId}</h3>
        <button
          onClick={deleteVariant}
          className="flex w-fit h-fit rounded-md text-white px-2 py-1 bg-[#EB0000] text-[12px] items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-white inline" viewBox="0 0 24 24">
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
            />
            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
          </svg>
          Delete
        </button>
      </div>

      <div className="bg-[#FAFAFA] rounded-b-[20px] p-7 pt-8 text-center text-lg">
        <span className="text-[#000000] text-[26px] font-medium">
          Upload your images
        </span>
        <p className="mt-1.5 text-[14px] text-[#797979]">
          Formats: PNG, JPG Max file size: 2mb
        </p>
        <div className="relative flex flex-col bg-[#FFFFFF] justify-center items-center gap-3 p-8 mt-[2.1875rem] rounded-[10px] border-2 border-dashed border-[#A6A6A6] text-[#444] cursor-pointer">
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
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor={`medicineName-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Medicine Name <MandatoryField />
        </label>
        <input
          type="text"
          id={`medicineName-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter medicine name"
        />
      </div>
      <div>
        <label
          htmlFor={`packageDescription-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Package Description <MandatoryField />
        </label>
        <input
          type="text"
          id={`packageDescription-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter package description"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label
          htmlFor={`mrp-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          MRP <MandatoryField />
        </label>
        <input
          type="number"
          id={`mrp-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter MRP"
        />
      </div>
      <div>
        <label
          htmlFor={`discount-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Discount (%) <MandatoryField />
        </label>
        <input
          type="number"
          id={`discount-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter discount percentage"
        />
      </div>
      <div>
        <label
          htmlFor={`quantity-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Quantity <MandatoryField />
        </label>
        <input
          type="number"
          id={`quantity-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter quantity"
        />
      </div>
      <div>
        <label
          htmlFor={`mrpPerUnit-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          MRP Per Unit <MandatoryField />
        </label>
        <input
          type="number"
          id={`mrpPerUnit-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter MRP per unit"
        />
      </div>
      <div>
        <label
          htmlFor={`mrpPerUnit-${variantId}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Unit <MandatoryField />
        </label>
        <input
          type="number"
          id={`mrpPerUnit-${variantId}`}
          className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
          placeholder="Enter MRP per unit"
        />
      </div>
    </div>

      {isOpenModal && <DeleteSmModal closeModal={() => setIsOpenModal(false)} />}
    </div>
  );
};

export default VariantForm;
