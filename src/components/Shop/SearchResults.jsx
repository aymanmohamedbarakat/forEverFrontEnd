import React from "react";
import { useSearchStore, useShopStore } from "../../store";
import { Search } from "lucide-react";

export default function SearchResults() {
  const { search, showSearch } = useSearchStore();
  const { displayProducts } = useShopStore();

  if (!showSearch || !search) {
    return null;
  }
  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-4">
      <p className="flex items-center gap-2 text-sm">
        <Search size={16} />
        <span>
          Showing results for: <span className="font-semibold">{search}</span>
        </span>
        {displayProducts.length === 0 ? (
          <span className="ml-2 text-red-500">No matches found</span>
        ) : (
          <span className="ml-2 text-gray-600">
            ({displayProducts.length} product
            {displayProducts.length !== 1 ? "s" : ""})
          </span>
        )}
      </p>
    </div>
  );
}
