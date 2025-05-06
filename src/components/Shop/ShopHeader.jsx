import React from "react";
import { useShopStore } from "../../store";
import Title from "../Title/Title";
import { ChevronDown, Filter } from "lucide-react";

export default function ShopHeader() {
  const { toggleMobileFilters, sortType, setSortType } = useShopStore();
  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white py-4 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-3 md:mb-0">
          <Title text1="MODERN" text2="COLLECTIONS" />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={toggleMobileFilters}
            className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium lg:hidden"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 pr-8 text-sm font-medium shadow-sm focus:border-gray-300 focus:outline-none appearance-none"
            >
              <option value="Relevant">Sort: Relevant</option>
              <option value="low-high">Sort: Price Low-High</option>
              <option value="high-low">Sort: Price High-Low</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
