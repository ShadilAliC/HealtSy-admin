import React, { useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import DeleteSmModal from "./DeleteSmModal";
import MandatoryField from "../../common/MandatoryField";
import upload from "../../assets/svg/upload.svg";
import Select from "react-select";
import UploadImagePreview from "./UploadImagePreview";
import UploadLoader from "./UploadLaoder";
import { uploadImagesToCloudinary } from "../../lib/utils";

const VariantForm = ({ variantId, units, onDelete, index, control }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [imageCount, setImageCount] = useState();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    formState: { errors },
  } = useForm();

  const { fields, update } = useFieldArray({
    control,
    name: "variants",
  });
  console.log(fields, "fields");

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
      const uploadedImages = await uploadImagesToCloudinary(files);
      update(index, {
        ...fields[index],
        images: [...(fields[index].images || []), ...uploadedImages],
      });
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      setFormError("Error uploading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={variantId} className="mt-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-[18px] font-Mulish mb-6">Variant {index + 1}</h3>
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

      <div className="bg-[#FAFAFA] rounded-b-[20px] p-7 pt-8 text-center text-lg">
        {fields[index].images && fields[index].images.length === 0 ? (
          <>
            <span className="text-[#000000] text-[26px] font-medium">
              Upload your images
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
                    multiple
                    name="images"
                    id={`images-${index}`}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`images-${index}`).click();
                    }}
                    className="mt-4 bg-[#FAE8EF] text-[#CB1B5B] font-Mulish font-medium px-6 py-2.5 rounded-[10px]"
                  >
                    Click to Browse
                  </button>
                </>
              )}
              {formError && (
                <p className="text-red-500 text-[14px] mt-2">{formError}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <UploadImagePreview
              index={index}
              images={fields[index].images || []}
              setImages={(newImages) =>
                update(index, { ...fields[index], images: newImages })
              }
              control={control}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor={`medicineName-${index}`}
            className="block mb-2 text-sm font-medium text-[#4D4D4D]"
          >
            Medicine Name <MandatoryField />
          </label>
          <Controller
            name={`variants.${index}.name`}
            control={control}
            defaultValue=""
            rules={{ required: "Medicine name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id={`medicineName-${index}`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter medicine name"
              />
            )}
          />
          {errors.variants?.[index]?.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants[index].name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor={`packageDescription-${index}`}
            className="block mb-2 text-sm font-medium text-[#4D4D4D]"
          >
            Package Description <MandatoryField />
          </label>
          <Controller
            name={`variants.${index}.package_description`}
            control={control}
            defaultValue=""
            rules={{ required: "Package description is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id={`packageDescription-${index}`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter package description"
              />
            )}
          />
          {errors.variants?.[index]?.package_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants[index].package_description.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label
            htmlFor={`mrp-${index}`}
            className="block mb-2 text-sm font-medium text-[#4D4D4D]"
          >
            MRP <MandatoryField />
          </label>
          <Controller
            name={`variants.${index}.mrp`}
            control={control}
            defaultValue=""
            rules={{
              required: "MRP is required",
              min: { value: 0, message: "MRP must be positive" },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id={`mrp-${index}`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter MRP"
              />
            )}
          />
          {errors.variants?.[index]?.mrp && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants[index].mrp.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor={`discount-${index}`}
            className="block mb-2 text-sm font-medium text-[#4D4D4D]"
          >
            Discount (%) <MandatoryField />
          </label>
          <Controller
            name={`variants.${index}.discount`}
            control={control}
            defaultValue=""
            rules={{
              required: "Discount is required",
              min: { value: 0, message: "Discount must be positive" },
              max: { value: 100, message: "Discount cannot exceed 100%" },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id={`discount-${index}`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter discount percentage"
              />
            )}
          />
          {errors.variants?.[index]?.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.variants[index].discount.message}
            </p>
          )}
        </div>
        <div>
        <label
          htmlFor={`quantity-${index}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Quantity <MandatoryField />
        </label>
        <Controller
          name={`variants.${index}.quantity`}
          control={control}
          defaultValue=""
          rules={{
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be at least 1" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id={`quantity-${index}`}
              className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
              placeholder="Enter quantity"
            />
          )}
        />
        {errors.variants?.[index]?.quantity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.variants[index].quantity.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor={`mrp_per_unit-${index}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          MRP Per Unit <MandatoryField />
        </label>
        <Controller
          name={`variants.${index}.mrp_per_unit`}
          control={control}
          defaultValue=""
          rules={{
            required: "MRP per unit is required",
            min: { value: 0, message: "MRP per unit must be positive" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id={`mrp_per_unit-${index}`}
              className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
              placeholder="Enter MRP per unit"
            />
          )}
        />
        {errors.variants?.[index]?.mrp_per_unit && (
          <p className="text-red-500 text-sm mt-1">
            {errors.variants[index].mrp_per_unit.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor={`unit-${index}`}
          className="block mb-2 text-sm font-medium text-[#4D4D4D]"
        >
          Unit <MandatoryField />
        </label>
        <Controller
          name={`variants.${index}.unit`}
          control={control}
          defaultValue={null}
          rules={{ required: "Unit is required" }}
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
        {errors.variants?.[index]?.unit && (
          <p className="text-red-500 text-sm mt-1">
            {errors.variants[index].unit.message}
          </p>
        )}
      </div>
      </div>

      {isOpenModal && (
        <DeleteSmModal
          closeModal={() => setIsOpenModal(false)}
          onDelete={() => {
            onDelete(variantId);
            setIsOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default VariantForm;
