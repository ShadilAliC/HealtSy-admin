import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <div className="flex items-center border border-primary rounded-lg overflow-hidden">
        <div className="px-4 py-2 text-sm flex items-center space-x-1">
          <span className="font-medium text-primary">
            {startItem} - {endItem}
          </span>
          <span className="text-muted-foreground"> of {totalItems} </span>
        </div>

        <div className="h-full w-px bg-border"></div>

        <div className="flex items-center">
          <button
            className="p-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="p-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
