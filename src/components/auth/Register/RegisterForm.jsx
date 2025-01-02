import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getOtp, verifyOto } from "../../../api/AuthApi";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/Slices/UserSlice";
import MandatoryField from "../../../common/MandatoryField";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
  const [isOtpverify, setIsOtpVerify] = useState(false);
  const [allFormData, setAllFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [userId, setUserId] = useState();
  const [originalPhone, setOriginalPhone] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const phone = watch("phone");

  useEffect(() => {
    if (userInfo) {
      setAllFormData({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        pharmacyName: userInfo.pharmacyName || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
      });

      setValue("firstName", userInfo.firstName || "");
      setValue("lastName", userInfo.lastName || "");
      setValue("pharmacyName", userInfo.pharmacyName || "");
      setValue("email", userInfo.email || "");
      setValue("phone", userInfo.phone || "");
      setIsPhoneNumberVerified(userInfo.isVerified || false);
      setOriginalPhone(userInfo.phone || "");
    }
  }, [userInfo, setValue]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsOtpVerify(newOtp.every((digit) => digit));

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    const validateForm = () => {
      return Object.values(allFormData).every((field) => field !== "");
    };
    setIsFormValid(validateForm());
  }, [allFormData]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResendOtp(true);
      setIsOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleGetOtp = async () => {
    try {
      const response = await getOtp({ phone: allFormData.phone });
      if (response && response.status) {
        toast.success(response.message);
        setIsOtpSent(true);
        setTimer(30);
        setCanResendOtp(false);
      } else {
        console.log("aa");
        toast.error(response?.message || "An unexpected error occurred", {
          style: {
            zIndex: 99999,
            position: "top-right",
          },
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to get OTP. Please try again later.", {
        style: {
          zIndex: 9999,
        },
      });
    }
  };

  const handleVerifyOtp = async () => {
    const response = await verifyOto({
      otp: otp.join(""),
      phone: allFormData.phone,
    });

    if (response && response.user && response.user.isVerified) {
      setOriginalPhone(response.user.phone);
      setUserId(response.user._id);
      setIsPhoneNumberVerified(true);
      setIsOtpSent(false);
      setOtp(["", "", "", ""]);
      toast.success(response.message);
    } else {
      toast.error(
        response?.message || "Verification failed. Please try again.",
        {
          style: {
            zIndex: -9999,
          },
        }
      );
    }
  };

  const onSubmit = () => {
    if (!isPhoneNumberVerified) {
      toast("Please verify your phone number before submitting.");
      return;
    }
    const { firstName, lastName, pharmacyName, email, phone } = allFormData;

    dispatch(
      setUserInfo({
        id: userId,
        firstName: firstName,
        lastName: lastName,
        pharmacyName: pharmacyName,
        email: email,
        phone: phone,
        isVerified: true,
      })
    );
    navigate(
      "/healthsy-partnered-doctors-network-programme/doctor-registration/pharmacy-license-and-location-details"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone") {
      if (`+91${value}` !== originalPhone) {
        setIsPhoneNumberVerified(false);
        setOtp(["", "", "", ""]);
        setIsOtpSent(false);
        setIsOtpVerify(false);
      } else {
        setIsPhoneNumberVerified(true);
      }
    }
  };

  const inputStyle = `
    w-[90%] p-2.5 text-md text-gray-900 bg-[rgb(255,255,255)] shadow-sm rounded-lg 
    focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-[#CB1B5B]
  `;

  return (
    <div className="w-full p-4 ml-16">
      <h1 className="text-2xl font-semibold font-Mulish mb-2">
        Partnered Pharmacy Registration Form
      </h1>
      <h4 className="text-gray-600 text-lg mb-6">
        Please fill the details below:
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-10 "
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-x-20 ">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              First Name <MandatoryField />
            </label>
            <input
              type="text"
              id="firstName"
              className={inputStyle}
              placeholder="Enter your first name"
              {...register("firstName", { required: "First Name is required" })}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-md  font-medium text-gray-900"
            >
              Last Name <MandatoryField />
            </label>
            <input
              type="text"
              id="lastName"
              className={inputStyle}
              placeholder="Enter your last name"
              {...register("lastName", { required: "Last Name is required" })}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="pharmacyName"
              className="block mb-2 text-md  font-medium text-gray-900"
            >
              Pharmacy Name <MandatoryField />
            </label>
            <input
              type="text"
              id="pharmacyName"
              className={inputStyle}
              placeholder="Enter your Pharmacy name"
              {...register("pharmacyName", {
                required: "Pharmacy Name is required",
              })}
              onChange={handleInputChange}
            />
            {errors.pharmacyName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.pharmacyName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md  font-medium text-gray-900"
            >
              Email ID <MandatoryField />
            </label>
            <input
              type="email"
              id="email"
              className={inputStyle}
              placeholder="Enter your email id"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-md  font-medium text-gray-900"
            >
              Phone Number <MandatoryField />
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                91
              </span>
              <input
                type="tel"
                id="phone"
                className={`${inputStyle} pl-12 pr-20`}
                placeholder="1234567890"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
              {isPhoneNumberVerified ? (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 font-medium">
                  Verified
                </span>
              ) : (
                allFormData?.phone?.length === 10 &&
                (isOtpSent ? (
                  <span className="absolute right-16 top-1/2 transform -translate-y-1/2 text-[#CB1B5B] font-medium">
                    {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-[#CB1B5B] font-medium"
                    disabled={isOtpSent}
                  >
                    Get OTP
                  </button>
                ))
              )}
            </div>
          </div>

          {isOtpSent && !isPhoneNumberVerified && (
            <div className="">
              <label
                htmlFor="otp"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                OTP Sent to 91{" "}
                {phone && phone.length === 10 ? (
                  `${phone[0]}********${phone[9]}`
                ) : (
                  <span className="text-red-500">Invalid phone number</span>
                )}
              </label>

              <div className="flex items-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className={`w-12 h-12 rounded-xl ${
                      digit
                        ? "border-0 border-[#CB1B5B]"
                        : "border border-gray-300"
                    } text-center text-xl font-medium focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-[#CB1B5B]`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className={`ml-4 px-4 py-2 rounded-lg ${
                    isOtpverify
                      ? "text-[#CB1B5B]"
                      : "text-gray-400 cursor-not-allowed"
                  } font-medium`}
                  disabled={!isOtpverify}
                >
                  Verify
                </button>
              </div>
              {timer > 0 && (
                <p className="mt-2 text-sm text-[#CB1B5B]">
                  Resend OTP in {timer} seconds
                </p>
              )}
              {canResendOtp && (
                <button
                  type="button"
                  onClick={handleGetOtp}
                  className="mt-2 text-sm text-[#CB1B5B] font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full md:w-1/2 py-4 px-5 text-md  font-medium text-white ${
              isFormValid && isPhoneNumberVerified
                ? "bg-[#CB1B5B]"
                : "bg-[#D6D6D6]"
            } rounded-lg focus:ring-4 focus:outline-none focus:ring-[#CB1B5B]/50`}
            disabled={!isFormValid || !isPhoneNumberVerified}
          >
            Next
          </button>
        </div>
      </form>
      <Toaster
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
    </div>
  );
}
