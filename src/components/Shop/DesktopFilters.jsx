import React from "react";
import { useShopStore } from "../../store";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function DesktopFilters() {
  const {
    showFilters,
    toggleFilters,
    showTypeFilters,
    toggleTypeFilters,
    categories,
    subCategories,
    filterProducts,
    handleFilters,
    productPerPage,
    setProductPerPage,
    clearFilters,
  } = useShopStore();
  return (
    <div className="hidden w-64 shrink-0 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:block">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase text-gray-900">
            Categories
          </h3>
          <button onClick={toggleFilters} className="text-gray-500">
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 space-y-2">
            {categories.map((el) => (
              <label
                key={el.documentId}
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  onChange={() => handleFilters(el.documentId, "category")}
                  checked={filterProducts.categories.includes(el.documentId)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span>{el.CategoryName}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase text-gray-900">
            Types
          </h3>
          <button onClick={toggleTypeFilters} className="text-gray-500">
            {showTypeFilters ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>
        {showTypeFilters && (
          <div className="mt-4 space-y-2">
            {subCategories.map((el) => (
              <label
                key={el.documentId}
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  onChange={() => handleFilters(el.documentId, "subCategory")}
                  checked={filterProducts.subCategories.includes(el.documentId)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span>{el.SubName}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
          Items Per Page
        </h3>
        <select
          value={productPerPage}
          onChange={(e) => setProductPerPage(Number(e.target.value))}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
        >
          <option value={8}>8 Items</option>
          <option value={12}>12 Items</option>
          <option value={16}>16 Items</option>
          <option value={24}>24 Items</option>
        </select>
      </div>

      {(filterProducts.categories.length > 0 ||
        filterProducts.subCategories.length > 0) && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
