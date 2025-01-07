import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import MandatoryField from "../../../../common/MandatoryField";
import { useMastersContext } from "../../../../context/MastersContext";
import {
  getProductTypeById,
  updateProductType,
} from "../../../../api/HealthSyServicesApi";
import toast, { Toaster } from "react-hot-toast";
import Success from "../../../../common/Success";

function EditProductType() {
  const { id } = useParams();
  const { setSelectedTab } = useMastersContext();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProductTypeData = async () => {
      setIsLoading(true);
      try {
        const res = await getProductTypeById(id);
        if (res.success) {
          setValue("name", res.data.name);
          setValue("status", res.data.status ? "Active" : "Non-Active");
        } else {
          toast.error("Failed to fetch ProductType data");
        }
      } catch (err) {
        toast.error("Error fetching ProductType data");
      }
      setIsLoading(false);
    };

    fetchProductTypeData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      data.status = data.status === "Active";
      const res = await updateProductType(id, data);
      if (res?.success) {
        setIsOpenSuccess(true);
        setMessage("ProductType Updated Successfully");
        setTimeout(() => {
          setIsOpenSuccess(false);
          setSelectedTab("productType");
          navigate("/healthsy-services/order-medicines/masters");
        }, 2000);
      } else {
        toast.error(res.message || "Failed to update ProductType.");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred.");
    }
  };

  const onclose = () => {
    setSelectedTab("productType");
    navigate("/healthsy-services/order-medicines/masters");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full -auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Product Type Name <MandatoryField />
            </label>
            <input
              id="name"
              {...register("name", {
                required: "Product Type Name is required",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
              Status <MandatoryField />
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer">
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "You must select a status" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      value="Active"
                      className="hidden peer"
                      checked={field.value === "Active"}
                      onChange={() => field.onChange("Active")}
                    />
                  )}
                />
                <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                  Active
                </span>
              </label>

              <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer">
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "You must select a status" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      value="Non-Active"
                      className="hidden peer"
                      checked={field.value === "Non-Active"}
                      onChange={() => field.onChange("Non-Active")}
                    />
                  )}
                />
                <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                  Non-Active
                </span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-2">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onclose}
            type="button"
            className="text-md text-red-600 rounded-md px-2 py-1 hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-28 sm:w-auto px-6 py-2 bg-[#3B86FF] text-white font-semibold rounded transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update
          </button>
        </div>
      </form>
      <Toaster />
      {isOpenSuccess && <Success message={message} />}
    </div>
  );
}

export default EditProductType;
