import React from "react";
import { useShopStore } from "../../store";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination() {
  const { activePage, handlePageChange, productsTotal, productPerPage } =
    useShopStore();

  const totalPages = Math.ceil(productsTotal / productPerPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            activePage === 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } border border-gray-200`}
        >
          <ArrowLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              activePage === 1
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-200`}
          >
            1
          </button>

          {/* Dots after first page */}
          {/* {activePage > 2 && totalPages > 2 && (
            <span className="flex h-10 w-5 items-center justify-center">
              ...
            </span>
          )} */}

          {/* Middle Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                page >= activePage - 1 &&
                page <= activePage + 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  activePage === page
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border border-gray-200`}
              >
                {page}
              </button>
            ))}

          {/* Dots before last page */}
          {activePage < totalPages - 3 && totalPages > 3 && (
            <span className="flex h-10 w-5 items-center justify-center">
              ...
            </span>
          )}

          {/* Last Page */}
          {totalPages !== 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                activePage === totalPages
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } border border-gray-200`}
            >
              {totalPages}
            </button>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            activePage === totalPages
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } border border-gray-200`}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
