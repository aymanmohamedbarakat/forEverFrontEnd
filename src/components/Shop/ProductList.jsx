import React from "react";
import { domain, useSearchStore, useShopStore } from "../../store";
import ProductItem from "../ProductItem/ProductItem";
import { SlidersHorizontal } from "lucide-react";

export default function ProductList() {
  const {
    displayProducts,
    isLoading,
    clearFilters,
    activePage,
    productPerPage,
  } = useShopStore();

  const startIndex = (activePage - 1) * productPerPage;
  const paginatedProducts = displayProducts.slice(
    startIndex,
    startIndex + productPerPage
  );

  if (isLoading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (paginatedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-20 text-center">
        <SlidersHorizontal size={32} className="mb-3 text-gray-400" />
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters or search term
        </p>
        <button
          onClick={() => {
            clearFilters();
            useSearchStore.getState().closeSearch();
          }}
          className="mt-4 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedProducts.map((product) => (
        <ProductItem
          key={product.documentId}
          id={product.documentId}
          name={product.name}
          imgUrl={
            product.image?.[0]?.url ? domain + product.image[0].url : undefined
          }
          price={product.price}
          bestSeller={product.bestSeller}
          category={product.category}
          sub_category={product.sub_category}
        />
      ))}
    </div>
  );
}
