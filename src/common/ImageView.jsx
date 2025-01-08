import React, { useState } from "react";
import { X } from "lucide-react";

function ImageModal({ selectedImage, onClose }) {
  console.log(selectedImage,'selectedImage');
  
  const [activeImage, setActiveImage] = useState(selectedImage[0]);

  const handleImageClick = (item) => {
    setActiveImage(item);
  };

  return (
    <div className="fixed w-full inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[551px] max-w-xl h-[551px] bg-white rounded-xl shadow-xl">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6 bg-[#F3F3F3] flex justify-center items-center">
            <img
              className="w-full p-8 max-h-[45vh] object-contain rounded-lg"
              src={activeImage.url}
              alt="Selected"
            />
          </div>
        </div>

        <div className="flex gap-4 p-4 overflow-x-auto">
          {selectedImage.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 bg-[#F5F5F5] border rounded-md ${
                activeImage === item ? "border-[#CB1B5B]" : "border-gray-200"
              }`}
              onClick={() => handleImageClick(item)}
            >
              <img
                className="w-[84px] h-[84px] object-contain rounded-md"
                src={item.url}
                alt={`Thumbnail ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
