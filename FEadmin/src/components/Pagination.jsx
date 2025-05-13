import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxPagesToShow) {
      if (currentPage <= half) {
        end = maxPagesToShow;
      } else {
        start = totalPages - maxPagesToShow + 1;
      }
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (start > 2) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }
    if (end < totalPages - 1) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-6">
      <ul className="flex items-center gap-2">
        {/* Nút Previous */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-3 rounded-lg transition duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900 hover:bg-blue-100"
            }`}
          >
            &larr;
          </button>
        </li>

        {/* Các số trang */}
        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="px-5 py-3 text-gray-800">...</span>
            ) : (
              <Link
                onClick={() => paginate(number)}
                to={"#"}
                className={`px-5 py-3 rounded-lg transition duration-300 ${
                  currentPage === number
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100"
                }`}
              >
                {number}
              </Link>
            )}
          </li>
        ))}

        {/* Nút Next */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-3 rounded-lg transition duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
           &rarr;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;