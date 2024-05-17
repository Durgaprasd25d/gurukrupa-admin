import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          className={`relative inline-flex items-center ${
            i === currentPage
              ? "bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          } px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          {i}
        </a>
      );
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 mt-1 rounded-lg bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
              currentPage === 1
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          {renderPageNumbers()}
          <a
            href="#"
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
