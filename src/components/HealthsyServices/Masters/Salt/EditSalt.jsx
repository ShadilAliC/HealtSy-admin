import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  getSaltMoleculeById,
  updateSaltMolecule,
} from "../../../../api/HealthSyServicesApi";
import { useMastersContext } from "../../../../context/MastersContext";
import MandatoryField from "../../../../common/MandatoryField";

function EditSalt() {
  const { id } = useParams();
  const { setAddAction, setSelectedTab } = useMastersContext();
  const navigate = useNavigate();
  const [saltData, setSaltData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    const fetchSaltData = async () => {
      try {
        const res = await getSaltMoleculeById(id);
        if (res.success) {
          setSaltData(res.data);
          setValue("name", res.data.name);
          setValue(
            "therapeutic_classification",
            res.data.therapeutic_classification
          );
          setValue("status", res.data.status ? "Active" : "Non-Active");
        } else {
          toast.error("Failed to fetch salt molecule data");
        }
      } catch (err) {
        toast.error("Error fetching salt molecule data");
      }
    };

    fetchSaltData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (data.status === "Active") {
        data.status = true;
      } else {
        data.status = false;
      }
      const res = await updateSaltMolecule(data, id);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Molecule Updated Successfully",
          customClass: { icon: "custom-success-icon" },
        });
        setSelectedTab("salt");
        setAddAction("");
        navigate("/healthsy-services/order-medicines/masters");
      } else {
        toast.error("Failed to update molecule");
      }
    } catch (err) {
      console.error("Error during update:", err);
      toast.error(
        err.message || "An error occurred while updating the molecule"
      );
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
        Edit Salt Molecule
      </h2>
      {saltData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
      <Toaster />
    </div>
  );
}

export default EditSalt;
