import React from "react";
import { useShopStore } from "../../store";
import { X } from "lucide-react";

export default function MobileFilters() {
  const {
    mobileFiltersOpen,
    setMobileFiltersOpen,
    activeFilterTab,
    setActiveFilterTab,
    categories,
    subCategories,
    filterProducts,
    handleFilters,
    productPerPage,
    setProductPerPage,
    clearFilters,
  } = useShopStore();
  return (
    <div
      className={`fixed inset-0 z-30 transform ${
        mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white transition-transform duration-300 lg:hidden`}
    >
      <div className="flex h-full flex-col overflow-y-auto p-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilterTab("categories")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeFilterTab === "categories"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveFilterTab("types")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeFilterTab === "types"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Types
          </button>
          <button
            onClick={() => setActiveFilterTab("perPage")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeFilterTab === "perPage"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Items Per Page
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          {activeFilterTab === "categories" && (
            <div className="space-y-2">
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
                Categories
              </h3>
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

          {activeFilterTab === "types" && (
            <div className="space-y-2">
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
                Types
              </h3>
              {subCategories.map((el) => (
                <label
                  key={el.documentId}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    onChange={() => handleFilters(el.documentId, "subCategory")}
                    checked={filterProducts.subCategories.includes(
                      el.documentId
                    )}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span>{el.SubName}</span>
                </label>
              ))}
            </div>
          )}

          {activeFilterTab === "perPage" && (
            <div className="space-y-2">
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
          )}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <button
            onClick={() => {
              clearFilters();
              setMobileFiltersOpen(false);
            }}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
