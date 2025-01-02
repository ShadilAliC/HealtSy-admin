import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../../../../public/images/icons/success.svg";
import person from "../../../../public/images/auth/person.svg";
import vector from "../../../../public/images/icons/vector.svg";
import download from "../../../../public/images/icons/download.svg";
import linkedin from "../../../../public/images/icons/Linkedin-2.svg";
import instagram from "../../../../public/images/icons/instagram-2.svg";
import facebook from "../../../../public/images/icons/facebook-2.svg";
import x from "../../../../public/images/icons/x-2.svg";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 10000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col mt-24 ">
      <div className="bg-[#FFEEF3] w-full ">
        <div className="container mx-auto px-4 flex flex-col items-center text-center mt-12">
          <img
            src={success}
            alt="Success icon"
            className="w-[100px] h-[100px] mb-8"
          />
          <h1 className="text-2xl md:text-3xl lg:text-[35px] font-semibold font-mulish mb-2">
            You have registered successfully
          </h1>
          <p className="text-[#797979] mb-6">
            Our team will contact you shortly
          </p>
          <img
            src={person}
            alt="Person illustration"
            className="max-w-[452.36px] h-[412px] "
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col items-center text-center">
        <h2 className="text-[16px] mb-4">
          Download 'HealthSy for Pharmacies' App
        </h2>
        <div className="flex  bg-[#CB1B5B] h-12 p-4 items-center mb-4 rounded-xl">
          <a
            href="https://play.google.com/store/apps/details?id=com.axaone.healthsypharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#CB1B5B]  text-white  mr-4">
              Google Play
            </button>
          </a>
          <img src={vector} alt="Vector icon" className=" bg-[#CB1B5B]" />
        </div>
        <h1 className="text-[#A6A6A6] mb-2">or</h1>
        <div className="flex items-center text-[#CB1B5B] mb-12 cursor-pointer">
          <img src={download} alt="Download icon" className="w-6 h-6 mr-2" />
          <span>Download Brochure</span>
        </div>
        <h3 className="text-[16px] text-[#4D4D4D] font-semibold mb-6">
          Follow us on
        </h3>
        <div className="flex justify-center space-x-8">
          <a href="https://www.linkedin.com/showcase/healthsy-for-retail-pharmacies/">
            <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="https://www.facebook.com/RetailPharmacies?mibextid=LQQJ4d">
            <img src={facebook} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/healthsyapp/?igshid=MzRlODBiNWFlZA%3D%3D">
            <img src={instagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src={x} alt="X (Twitter)" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Success;

