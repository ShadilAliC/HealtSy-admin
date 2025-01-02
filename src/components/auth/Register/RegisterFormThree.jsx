import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../../api/AuthApi";
import { resetUserDetails } from "../../../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

function RegisterFormThree() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const pharmacyInfo = useSelector((state) => state.user.pharmacyInfo);

  const [formData, setFormData] = useState({
    otcDiscount: "",
    pharmacySize: "",
    inventoryValue: "",
    monthlyTurnover: "",
    pharmacistsCount: "",
    hasDeliveryStaff: "",
    hasPoc: "",
    isPartOfPlatform: "",
    wholesaleLicense: "",
    billingSoftware: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    function isEmptyObject(obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    if (
      userInfo === null ||
      isEmptyObject(userInfo) ||
      pharmacyInfo === null ||
      isEmptyObject(pharmacyInfo)
    ) {
      navigate(
        "/healthsy-partnered-doctors-network-programme/doctor-registration"
      );
    }

    const validateForm = () => {
      return Object.values(formData).every((field) => field !== "");
    };
    setIsFormValid(validateForm());
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const combinedInfo = { ...userInfo, ...pharmacyInfo, ...formData };
      const response = await postData(combinedInfo);
      const { token } = response;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      if (response.success) {
        dispatch(resetUserDetails());
        navigate("success");
      }
    }
  };

  const inputStyle = `
    w-full p-2.5 text-sm text-gray-900 bg-[rgb(255,255,255)] shadow-sm rounded-lg
focus:outline-none focus:ring-2 focus:ring-[#CB1B5B] focus:border-[#CB1B5B]
  `;

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="grid gap-y-6 gap-x-24 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              OTC Discounts (%)*
            </label>
            <select
              name="otcDiscount"
              className={`${inputStyle} font-Mulish`}
              value={formData.otcDiscount}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="0-10%">0-10%</option>
              <option value="11-20%">11-20%</option>
              <option value="21-30%">21-30%</option>
              <option value="Above 30%">Above 30%</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              What is the approximate size of your pharmacy store?*
            </label>
            <select
              name="pharmacySize"
              className={inputStyle}
              value={formData.pharmacySize}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Small (<500 sq. ft.)">
                Small (&lt;500 sq. ft.)
              </option>
              <option value="Medium (500-1000 sq. ft.)">
                Medium (500-1000 sq. ft.)
              </option>
              <option value="Large (1000+ sq. ft.)">
                Large (1000+ sq. ft.)
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              What is the value of inventory you have in your pharmacy store?*
            </label>
            <select
              name="inventoryValue"
              className={inputStyle}
              value={formData.inventoryValue}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Less than $10,000">Less than $10,000</option>
              <option value="$10,000 - $50,000">$10,000 - $50,000</option>
              <option value="More than $50,000">More than $50,000</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Monthly Average Turnover *
            </label>
            <select
              name="monthlyTurnover"
              className={inputStyle}
              value={formData.monthlyTurnover}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Less than 5 lakhs">Less than 5 Lakhs</option>
              <option value="$10,000 - $50,000">5 - 10 Lakhs</option>
              <option value="More than $50,000">10 - 15 Lakhs</option>
              <option value="More than $50,000">15 - 20 Lakhs</option>
              <option value="More than $50,000">20 - 30 Lakhs</option>
              <option value="More than $50,000">30 - 50 Lakhs</option>
              <option value="More than $50,000">Above 50 Lakhs</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              How many pharmacists are working in your pharmacy? *
            </label>
            <select
              name="pharmacistsCount"
              className={inputStyle}
              value={formData.pharmacistsCount}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="1">1</option>
              <option value="2-5">2-5</option>
              <option value="More than 5">More than 5</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Do you have a delivery person / staff to deliver orders to your
              customers? *
            </label>
            <select
              name="hasDeliveryStaff"
              className={inputStyle}
              value={formData.hasDeliveryStaff}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Do You have Poc for your retail pharmacy store ? *
            </label>
            <select
              name="hasPoc"
              className={inputStyle}
              value={formData.hasPoc}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Are you currently part of any online pharmacy / health-tech
              platforms ? *
            </label>
            <select
              name="isPartOfPlatform"
              className={inputStyle}
              value={formData.isPartOfPlatform}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="mb-2 text-sm font-medium text-gray-900">
              Do you have a wholesale license? *
            </label>
            <select
              name="wholesaleLicense"
              className={inputStyle}
              value={formData.wholesaleLicense}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Do you currently use any billing / sales / ERP software? *
            </label>
            <select
              name="billingSoftware"
              className={inputStyle}
              value={formData.billingSoftware}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <h1 className="text-center text-[#65626C] pt-10">
          By clicking on Register, I agree to the{" "}
          <span className="text-[#CB1B5B] text-[14px] font-semibold underline cursor-pointer">
            {" "}
            Terms and Conditions & Privacy Policy
          </span>{" "}
        </h1>

        <div className="flex justify-between md:gap-20 pb-3">
          <button
            onClick={() =>
              navigate(
                "/healthsy-partnered-doctors-network-programme/doctor-registration/pharmacy-license-and-location-details"
              )
            }
            type="button"
            className="w-full md:w-1/2 h-12  text-sm font-medium text-[#CB1B5B] border-[1px] border-[#CB1B5B] rounded-lg focus:ring-4 focus:outline-none focus:ring-[#CB1B5B]/50"
          >
            Go Back
          </button>
          <button
            type="submit"
            className={`w-full md:w-1/2 h-12 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-[#CB1B5B]/50 ${
              isFormValid ? "bg-[#CB1B5B]" : "bg-[#D6D6D6]"
            }`}
            disabled={!isFormValid}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterFormThree;
