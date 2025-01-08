import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DeleteSmModal from "./DeleteSmModal";
import MandatoryField from "../../common/MandatoryField";
import upload from "../../assets/svg/upload.svg";
import Select from "react-select";

const VariantForm = ({ variantId, units, onDelete }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const deleteVariant = () => {
    setIsOpenModal(true);
  };

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    setLoading(true);
    setImageCount(files.length);
    setFormError(null);

    try {
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/image/upload`; // Replace with your Cloudinary details
      const uploadPreset = "Healtsy";

      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }

          const data = await response.json();
          return data.secure_url;
        })
      );

      setFiles((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      setFormError("Error uploading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div key={variantId} className="mt-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-[18px] font-Mulish mb-6">Variant {variantId}</h3>
        <button
          onClick={deleteVariant}
          className="flex w-fit h-fit rounded-md text-white px-2 py-1 bg-[#EB0000] text-[12px] items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[14px] fill-white inline"
            viewBox="0 0 24 24"
          >
            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
          </svg>
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              multiple
              id="file-input"
              className="hidden"
              onChange={handleFileChange}
              {...register("images", {
                required: "At least one image is required",
              })}
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
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
              {...register("name", { required: "Medicine name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
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
              {...register("package_description", {
                required: "Package description is required",
              })}
            />
            {errors.package_description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.package_description.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
              {...register("mrp", {
                required: "MRP is required",
                min: { value: 0, message: "MRP must be positive" },
              })}
            />
            {errors.mrp && (
              <p className="text-red-500 text-sm mt-1">{errors.mrp.message}</p>
            )}
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
              {...register("discount", {
                required: "Discount is required",
                min: { value: 0, message: "Discount must be positive" },
                max: { value: 100, message: "Discount cannot exceed 100%" },
              })}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
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
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
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
              {...register("mrp_per_unit", {
                required: "MRP per unit is required",
                min: { value: 0, message: "MRP per unit must be positive" },
              })}
            />
            {errors.mrp_per_unit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mrp_per_unit.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={`unit-${variantId}`}
              className="block mb-2 text-sm font-medium text-[#4D4D4D]"
            >
              Unit <MandatoryField />
            </label>
            <Controller
              name="unit"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Select
                  {...field}
                  options={units.map((unit) => ({
                    value: unit._id,
                    label: unit.unit,
                  }))}
                  placeholder="Select Unit"
                  className="w-full"
                  classNamePrefix="react-select"
                  isClearable
                />
              )}
            />
            {errors.unit && (
              <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
            )}
          </div>
        </div>
      </form>

      {isOpenModal && (
        <DeleteSmModal
          closeModal={() => setIsOpenModal(false)}
          onDelete={() => onDelete(variantId)}
          variantId={variantId}
        />
      )}
    </div>
  );
};

export default VariantForm;
