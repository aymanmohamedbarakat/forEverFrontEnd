import React from "react";
import { useShopStore } from "../../store";
import { X } from "lucide-react";

export default function AppliedFilters() {
  const { filterProducts, handleFilters, categories, subCategories } =
    useShopStore();

  if (
    filterProducts.categories.length === 0 &&
    filterProducts.subCategories.length === 0
  ) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {filterProducts.categories.map((catId) => {
          const category = categories.find((c) => c.documentId === catId);
          return category ? (
            <div
              key={catId}
              className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              <span>{category.CategoryName}</span>
              <button
                onClick={() => handleFilters(catId, "category")}
                className="ml-1 rounded-full p-1 hover:bg-gray-200"
              >
                <X size={14} />
              </button>
            </div>
          ) : null;
        })}

        {filterProducts.subCategories.map((subId) => {
          const subCategory = subCategories.find((s) => s.documentId === subId);
          return subCategory ? (
            <div
              key={subId}
              className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              <span>{subCategory.SubName}</span>
              <button
                onClick={() => handleFilters(subId, "subCategory")}
                className="ml-1 rounded-full p-1 hover:bg-gray-200"
              >
                <X size={14} />
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
