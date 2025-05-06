import React, { useEffect } from "react";
import { useSearchStore, useShopStore } from "../store";
import ShopHeader from "../components/Shop/ShopHeader";
import MobileFilters from "../components/Shop/MobileFilters";
import DesktopFilters from "../components/Shop/DesktopFilters";
import SearchResults from "../components/Shop/SearchResults";
import AppliedFilters from "../components/Shop/AppliedFilters";
import ProductList from "../components/Shop/ProductList";
import Pagination from "../components/Shop/Pagination";

export default function ShopMain() {
  const { fetchInitialData, applyFiltersAndSort, allProducts } = useShopStore();

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFiltersAndSort();
    }
  }, [
    allProducts,
    useShopStore().filterProducts,
    useShopStore().sortType,
    useSearchStore().search,
    useSearchStore().showSearch,
  ]);
  return (
    <div className="bg-white">
        <ShopHeader />
        <div className="container mx-auto px-4 pb-12 pt-6">
        <div className="flex flex-col gap-6 lg:flex-row">
        <MobileFilters />
        <DesktopFilters />

        <div className="flex-1">
        <SearchResults />
            <AppliedFilters />
            <ProductList />
            <Pagination />
        </div>
        </div>
        </div>
    </div>
  )
}
