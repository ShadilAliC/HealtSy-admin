'use client'

import React, { useState } from "react";

function UploadImagePreview({ images, setImages }) {
  const totalBoxes = 10;
  const items = Array.from({ length: totalBoxes });
  const [draggedItem, setDraggedItem] = useState(null);

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) =>
      [...prevImages, ...newImages].slice(0, totalBoxes)
    );
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedItem, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
    setDraggedItem(null);
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="relative w-full min-h-[350px] flex flex-col bg-white justify-center items-center rounded-[15px] border-2 border-dashed border-[#A6A6A6] text-[#444] cursor-pointer">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-5 md:p-5 lg:p-6 w-full">
          {items.map((_, index) => (
            <div
              key={index}
              className="aspect-square w-[80%] bg-[#F5F5F5] rounded-lg flex justify-center items-center overflow-hidden relative"
              draggable={!!images[index]}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {images[index] ? (
                <>
                  <div className="relative w-full  h-full p-2">
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-contain rounded-md"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 p-1 rounded-full shadow-md"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <path
                          d="M3 6h18M9 6V4h6v2M10 11v6M14 11v6M5 6h14l-1.5 14H6.5L5 6Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : index === images.length ? (
                <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  >
                    <path
                      d="M7.85938 1.25V14.75M14.6094 8H1.10938"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadImagePreview;

