import React, { useEffect, useState } from "react";
import { state_arr, s_a } from "./data";
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setPharmacyInfo } from "../../../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import MandatoryField from "../../../common/MandatoryField";

export default function RegisterFormTwo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pharmacyInfo = useSelector((state) => state.user.pharmacyInfo);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isFormValid, setIsFormValid] = useState(false);
  const [location, setLocation] = useState({ address: "", city: "" });
  const [filteredStates, setFilteredStates] = useState(state_arr);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setValue("state", selectedState);
    setValue("city", "");
  };

  useEffect(() => {
    if (pharmacyInfo) {
      Object.keys(pharmacyInfo).forEach((key) => {
        setValue(key, pharmacyInfo[key]);
      });
      if (pharmacyInfo.state) {
        handleStateChange({ target: { value: pharmacyInfo.state } });
      }
    }
  }, [pharmacyInfo, setValue]);

  useEffect(() => {
    function isEmptyObject(obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }
  
    if (userInfo === null || isEmptyObject(userInfo)) {
      navigate("/healthsy-partnered-doctors-network-programme/doctor-registration");
    }
  
    // Only update "city" if the value has changed
    if (location.address !== formData.city) {
      setValue("city", location.address);
    }
  
    const allFieldsFilled = Object.keys(formData).every(
      (key) => formData[key] !== "" && formData[key] !== undefined
    );
  
    // Only update "isFormValid" if its value has changed
    const newFormValidity = isValid && allFieldsFilled && location.city !== "";
    if (newFormValidity !== isFormValid) {
      setIsFormValid(newFormValidity);
    }
  }, [isValid, formData, location, setValue, isFormValid]); // Add `isFormValid` as a dependency to track its state
  

  const onSubmit = (data) => {
    const submissionData = {
      ...data,
      location: location.address,
      city: location.city,
    };

    dispatch(setPharmacyInfo(submissionData));
    navigate(
      "/healthsy-partnered-doctors-network-programme/doctor-registration/pharmacy-license-and-location-details/other-information"
    );
  };

  // const handleStateSearch = (e) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   const filtered = state_arr.filter((state) =>
  //     state.toLowerCase().includes(searchTerm)
  //   );
  //   setFilteredStates(filtered);
  // };

  const inputStyle = `
    w-full p-2.5 text-md text-gray-900 bg-[rgb(255,255,255)] shadow-sm rounded-lg
    focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-[#CB1B5B]
  `;

  return (
    <div className="w-full p-4 max-w-5xl mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full flex flex-col gap-2 sm:flex-row justify-between sm:gap-20 pb-3">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Pharmacy Business Type <MandatoryField />
            </label>
            <select
              {...register("pharmacyBusinessType", {
                required: "This field is required",
              })}
              className={inputStyle}
            >
              <option value="" disabled>
                Select your pharmacy business type
              </option>
              <option value="retail">Retail Pharmacy</option>
              <option value="hospital">Hospital Pharmacy</option>
              <option value="clinic">Clinic Pharmacy</option>
              <option value="online">Online Pharmacy</option>
              <option value="compounding">Compounding Pharmacy</option>
            </select>
            {errors.pharmacyBusinessType && (
              <p className="text-md text-red-500">
                {errors.pharmacyBusinessType.message}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Company Name (if different from pharmacy name) <MandatoryField />
            </label>
            <input
              {...register("companyName", {
                required: "This field is required",
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="text-md text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:gap-20 pb-3">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Pharmacy GST Number <MandatoryField />
            </label>
            <input
              {...register("pharmacyGstNumber", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your pharmacy GST number"
            />
            {errors.pharmacyGstNumber && (
              <p className="text-md text-red-500">
                {errors.pharmacyGstNumber.message}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Drug License Number (Form 20 and Form 21) <MandatoryField />
            </label>
            <input
              {...register("drugLicenseNumber", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your drug license number"
            />
            {errors.drugLicenseNumber && (
              <p className="text-md text-red-500">
                {errors.drugLicenseNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:gap-20 pb-3">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              FSSAI Number <MandatoryField />
            </label>
            <input
              {...register("fssaiNumber", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your FSSAI number"
            />
            {errors.fssaiNumber && (
              <p className="text-md text-red-500">
                {errors.fssaiNumber.message}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Your Pharmacist's License Number <MandatoryField />
            </label>
            <input
              {...register("pharmacistLicenseNumber", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your pharmacist's license number"
            />
            {errors.pharmacistLicenseNumber && (
              <p className="text-md text-red-500">
                {errors.pharmacistLicenseNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:gap-4 pb-3">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <label className="block mb-2 text-md font-medium text-gray-900">
              State <MandatoryField />
            </label>
            <select
              {...register("state", { required: "This field is required" })}
              className={`${inputStyle} mt-2`}
              onChange={handleStateChange}
            >
              <option className="text-[#98969D]" value="">
                Select your state
              </option>
              {filteredStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-md text-red-500">{errors.state.message}</p>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:ml-20 md:mt-1.5">
            <label className="block mb-2 text-md font-medium text-gray-900">
              City <MandatoryField />
            </label>
            <Autocomplete
              apiKey={"AIzaSyBJUZFe3zt4HNVzwdTlmJYMWtXhZ7mfclk"}
              onPlaceSelected={(place) => {
                const cityComponent = place.address_components.find(
                  (component) => component.types.includes("locality")
                );
                setLocation({
                  address: place.formatted_address,
                  city: cityComponent ? cityComponent.long_name : "",
                });
              }}
              types={["address"]}
              className={inputStyle}
              placeholder="Type here"
              componentRestrictions={{ country: "in" }}
            />
            {/* {location.city && (
              <p className="text-md text-red-500">This field is required</p>
            )} */}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-md font-medium text-gray-900">
            Pharmacy Address <MandatoryField />
          </label>
          <textarea
            {...register("pharmacyAddress", {
              required: "This field is required",
            })}
            className="w-full p-2.5 text-md text-gray-900 bg-[#fff] shadow-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#CB1B5B]"
            placeholder="Enter your pharmacy address"
          />
          {errors.pharmacyAddress && (
            <p className="text-md text-red-500">
              {errors.pharmacyAddress.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between sm:gap-20 pb-3">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Pincode <MandatoryField />
            </label>
            <input
              {...register("pincode", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="text"
              className={inputStyle}
              placeholder="Enter your pincode"
            />
            {errors.pincode && (
              <p className="text-md text-red-500">{errors.pincode.message}</p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Medicine Discounts (%) <MandatoryField />
            </label>
            <select
              {...register("medicineDiscount", {
                required: "This field is required",
              })}
              className={inputStyle}
            >
              <option value="">Select your Medicine Discounts</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
              <option value="35">35%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
            </select>
            {errors.medicineDiscount && (
              <p className="text-md text-red-500">
                {errors.medicineDiscount.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:gap-4 pb-3">
          <button
            onClick={() =>
              navigate(
                "/healthsy-partnered-doctors-network-programme/doctor-registration"
              )
            }
            type="button"
            className="w-full sm:w-1/2 h-12 text-md font-medium text-[#CB1B5B] border-[1px] border-[#CB1B5B] rounded-lg focus:ring-4 focus:outline-none focus:ring-[#CB1B5B]/50 mb-4 sm:mb-0"
          >
            Go Back
          </button>
          <button
            type="submit"
            className={`w-full sm:w-1/2 h-12 text-md font-medium text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-[#CB1B5B]/50 ${
              isFormValid ? "bg-[#CB1B5B]" : "bg-[#D6D6D6]"
            }`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
