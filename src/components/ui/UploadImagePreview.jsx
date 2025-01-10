import React, { useState, useEffect } from "react";
import { uploadImagesToCloudinary } from "../../lib/utils";
import { useFieldArray } from "react-hook-form";

function UploadImagePreview({ index, images: propImages, setImages, control }) {
  const [localImages, setLocalImages] = useState(propImages || []);
  const totalBoxes = 10;

  const { fields,update } = control
    ? useFieldArray({
        control,
        name: "variants",
      })
    : { fields: null, update: null };

  useEffect(() => {
    setLocalImages(propImages || []);
  }, [propImages]);

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    const uploadedImages = await uploadImagesToCloudinary(newFiles);
    console.log('-------------------------');

    if (control && update) {
      console.log('00000000000000',fields);
      
      // const currentImages = fields[index]?.images || [];

      // // Merge the current images with the new ones
      // const updatedVariantImages = [...currentImages, ...uploadedImages];
// console.log(updatedVariantImages,'updatedVariantImages');

      // Update the field array at the specific index
      // update(index, {
      //   ...fields[index],
      //   images: [...updatedVariantImages],
      // });
      const updatedVariantImages = [
        ...(fields[index].images || []),  // Ensure we don't override existing images
        ...uploadedImages,                // Add newly uploaded images
      ];

      // Update the field array at the specific index
      update(index, {
        ...fields[index],                // Keep existing field data intact
        images: updatedVariantImages,    // Update the images array for this variant
      });
      setLocalImages(updatedVariantImages);
      setImages(updatedVariantImages);
    
    } else {
    console.log('--------111111111111-----------------');

      setLocalImages((prevImages) => [...prevImages, ...uploadedImages]);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }

    e.target.value = "";
  };

  const handleRemoveImage = (removeIndex) => {
    const updatedImages = localImages.filter((_, i) => i !== removeIndex);
    setLocalImages(updatedImages);
    if (control && update) {
      update(index, { ...fields[index], images: updatedImages });
    } else {
      setImages(updatedImages);
    }
  };

  const handleDragStart = (e, dragIndex) => {
    e.dataTransfer.setData("text/plain", dragIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    const updatedImages = [...localImages];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);
    setLocalImages(updatedImages);
    if (control && update) {
      update(index, { ...fields[index], images: updatedImages });
    } else {
      setImages(updatedImages);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full min-h-[350px] flex flex-col bg-white justify-center items-center rounded-[15px] border-2 border-dashed border-[#A6A6A6] text-[#444] cursor-pointer">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-5 md:p-5 lg:p-6 w-full">
          {Array.from({ length: totalBoxes }).map((_, boxIndex) => (
            <div
              key={boxIndex}
              className="aspect-square w-[80%] bg-[#F5F5F5] rounded-lg flex justify-center items-center overflow-hidden relative"
              draggable={!!localImages[boxIndex]}
              onDragStart={(e) => handleDragStart(e, boxIndex)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, boxIndex)}
            >
              {localImages[boxIndex] ? (
                <>
                  <img
                    src={localImages[boxIndex]?.url || localImages[boxIndex]}
                    alt={`Uploaded ${boxIndex + 1}`}
                    className="w-full h-full  object-contain rounded-md"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 p-1 rounded-full shadow-md"
                    onClick={() => handleRemoveImage(boxIndex)}
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
                </>
              ) : boxIndex === localImages.length ? (
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
