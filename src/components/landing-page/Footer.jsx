import React from "react";
import logo from "../../../public/images/logo/logo_2.svg";
import linkedIn from '../../../public/images/icons/LinkedIn.svg';
import facebook from '../../../public/images/icons/facebook.svg';
import instagram from '../../../public/images/icons/instagram.svg';
import X from '../../../public/images/icons/X.svg';

function Footer() {
  const footerSections = [
    {
      title: "SERVICES",
      items: [
        "Order Medicines",
        "Online Doctor Consultations",
        "In-Clinic Appointments",
        "Home Healthcare Services",
        "Healthcare Products",
        "InstaDoc",
        "HealthSy Advantage Subscription",
      ],
    },
    {
      title: "HEALTHSYNERGY",
      items: [
        "For Doctors",
        {
          text: "HealthSy Partnered Retail Pharmacies Network Programme",
          className: "whitespace-normal",
        },
        {
          text: "HealthSy Partnered Home Healthcare",
          subtext: "Providers Network Programme",
          className: "whitespace-normal",
        },
        "HealthSy InstaDoc",
        {
          text: "HealthSy Retail Pharmacies",
          subtext: "Franchise Programme",
          className: "whitespace-normal",
        },
      ],
    },
    {
      title: "LEGAL PAGES",
      items: [
        "Terms and Conditions",
        "Privacy Policy",
        "Return Refund and Cancellation Policy",
        "Customer Grievance Redressal Policy",
      ],
    },
    {
      title: "COMPANY",
      items: [
        "About Us",
        "Blogs",
        "Careers",
        "HealthSy Life",
        "Contact Us",
        "Sustainability Policy",
        "FAQs",
      ],
    },
  ];

  return (
    <footer className="bg-[#181423] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-lg font-bold">{section.title}</h2>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={typeof item === "object" ? item.className : ""}
                  >
                    {typeof item === "string" ? (
                      <a
                        href="#"
                        className="hover:text-gray-300 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    ) : (
                      <div>
                        <a
                          href="#"
                          className="hover:text-gray-300 transition-colors duration-200"
                        >
                          {item.text}
                        </a>
                        {item.subtext && (
                          <div className="hover:text-gray-300 transition-colors duration-200">
                            {item.subtext}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between md:pr-[8%] items-start mt-14 border-t border-gray-700 pt-8 text-sm">
          <div className="flex flex-col items-start mb-8 md:mb-0">
            <img src={logo} alt="HealthSy Logo" className="mb-4" />
            <p className="text-gray-300">
              All-in-one Healthcare App for your immediate and <br />
              <span className="block mt-2">recurring healthcare needs.</span>
            </p>
          </div>
          <div className="flex flex-col p-4  rounded-md">
            <h2 className="text-lg font-bold">SOCIAL MEDIA</h2>
            <p className="mt-2 text-gray-300">
              Follow us on social media to find out <br />
              <span className="block mt-2">the latest updates on our progress</span>
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <img src={linkedIn} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <div className="bg-white rounded-full p-1">
                  <img src={facebook} alt="Facebook" className="w-4 h-4" />
                </div>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <img src={instagram} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <img src={X} alt="X" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-md">
          &copy; {new Date().getFullYear()} HealthSy 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;