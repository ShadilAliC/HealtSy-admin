import React from "react";

const DeleteSmModal = ({ closeModal, onDelete, variantId }) => {
  const handleDeleteVariant = () => {
    onDelete(variantId);
    closeModal();
  };
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-xs bg-white shadow-lg rounded-xl p-6 relative"> 
        <div className="my-4 text-center">
          <h4 className="text-gray-800 text-base font-semibold mt-4">
          Are you sure you want to delete this variant?
          </h4>
          <div className="text-center space-x-4 mt-8">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
              onClick={handleDeleteVariant}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSmModal;
