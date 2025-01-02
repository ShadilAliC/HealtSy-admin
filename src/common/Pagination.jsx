import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full flex items-center justify-end">
      <div className="flex items-center border border-primary rounded-md p-2">
        <div className="text-sm mr-4">
          <span className="text-[#181423]">
            {startItem}-{endItem}
          </span>
          <span className="text-[#797979]"> of {totalItems} </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Pagination;

