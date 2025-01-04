import React, { useEffect } from "react";
import { useForm ,Controller } from "react-hook-form";
import MandatoryField from "../../../../common/MandatoryField";
import { useNavigate } from "react-router-dom";
import { useMastersContext } from "../../../../context/MastersContext";
import { createSaltMolecule } from "../../../../api/HealthSyServicesApi";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function AddSalt() {
  const { setAddAction, setSelectedTab } = useMastersContext();

  const navigate = useNavigate();
  useEffect(() => {});
  const {
    register,
    handleSubmit,
    control ,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (data.status === "Active") {
        data.status = true;
      } else {
        data.status = false;
      }

      const res = await createSaltMolecule(data);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "New Molecule Added Successfully",
          customClass: {
            icon: "custom-success-icon",
          },
        });
        toast.success(res.message);
        setSelectedTab("salt");
        navigate("/healthsy-services/order-medicines/masters");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const onclose = () => {
    setSelectedTab("salt");
    setAddAction("");
    navigate("/healthsy-services/order-medicines/masters");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full -auto">
      <h2 className="text-2xl font-Mulish font-semibold mb-6">
        Add Salt Molecule
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Molecule Name <MandatoryField />
            </label>
            <input
              id="name"
              {...register("name", { required: "Molecule Name is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="therapeutic_classification"
              className="block font-medium"
            >
              Therapeutic Classification <MandatoryField />
            </label>
            <input
              id="therapeutic_classification"
              {...register("therapeutic_classification", {
                required: "Therapeutic Classification is required",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.therapeutic_classification && (
              <span className="text-red-500 text-sm">
                {errors.therapeutic_classification.message}
              </span>
            )}
          </div>
        </div>
        {/* <div className="p-1 flex flex-col font-poppins">
          <h1 className="mr-3 font-medium">Status</h1>
          <div className="flex items-center">
            <div className="relative flex items-center font-poppins">
              <input
                id="status"
                type="checkbox"
                {...register("status")}
                className="peer h-4 w-4 appearance-none border border-gray-300 rounded bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg
                className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white left-0.5 top-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label
              htmlFor="status"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Active
            </label>
          </div>
        </div> */}
        <div>
        <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
          Status <MandatoryField />
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
            <Controller
              name="status"
              control={control}
              defaultValue="Active"
              render={({ field }) => (
                <input
                  {...field}
                  type="radio"
                  value="Active"
                  className="hidden peer"
                />
              )}
            />
            <span className="text-gray-900 peer-checked:text-primary ">
              Active
            </span>
          </label>

          <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-orange-600">
            <Controller
              name="status"
              control={control}
              defaultValue="Active"
              render={({ field }) => (
                <input
                  {...field}
                  type="radio"
                  value="Non-Active"
                  className="hidden peer"
                />
              )}
            />
            <span className="text-gray-900 peer-checked:text-primary">
              Non-Active
            </span>
          </label>
        </div>
      </div>

        <div className="flex gap-2">
          <button
            onClick={onclose}
            type="button"
            className=" text-md text-red-600 rounded-md px-2 py-1 hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-28 sm:w-auto px-6 py-2 bg-[#1AAA55] text-white font-semibold rounded transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default AddSalt;
