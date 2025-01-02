import React from 'react';
import { X } from 'lucide-react';

function ViewData({ isModalOpen, selectedUser, closeModal }) {
  if (!isModalOpen || !selectedUser) return null;

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return value?.toString() || 'N/A';
  };

  const fieldOrder = [
    'firstName',
    'lastName',
    'pharmacyName',
    'email',
    'phone',
    'pharmacyBusinessType',
    'companyName',
    'pharmacyGstNumber',
    'drugLicenseNumber',
    'fssaiNumber',
    'pharmacistLicenseNumber',
    'state',
    'city',
    'pharmacyAddress',
    'pincode',
    'medicineDiscount',
    'otcDiscount',
    'pharmacySize',
    'inventoryValue',
    'monthlyTurnover',
    'pharmacistsCount',
    'hasDeliveryStaff',
    'hasPoc',
    'isPartOfPlatform',
    'wholesaleLicense',
    'billingSoftware'
  ];
    
  const formatFieldName = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-[105]  justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[90vh] scroll-1 overflow-y-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 ">
          {fieldOrder.map((field) => (
            <div key={field} className="mb-2 space-x-2   ">
              <span className="font-semibold text-gray-500">{formatFieldName(field)}:</span>{' '}
              <span className="font-bold text-gray-700">{renderValue(selectedUser[field])}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewData;

