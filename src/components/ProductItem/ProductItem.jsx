import React from "react";
import { Link } from "react-router-dom";
import { currency } from "../../store";

export default function ProductItem({
  id,
  imgUrl,
  name,
  price,
  bestSeller,
  category,
  sub_category,
}) {
  const categoryName = category?.CategoryName || "Uncategorized";
  const subCategoryName = sub_category?.SubName;

  return (
    <div className="group block relative text-gray-700 hover:text-gray-900 transition-colors duration-300">
      {/* Product Image Container */}
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all">
        {bestSeller ? (
          <span className="absolute top-2 left-2 bg-red-400 hover:scale-105 transition-transform text-white text-xs font-medium px-1.5 py-1 rounded-full z-10 shadow-md">
            TopSeller
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-black hover:scale-105 transition-transform text-white text-xs font-medium px-2 py-1 rounded-full z-10 shadow-md">
            New
          </span>
        )}
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={
            imgUrl ||
            "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
          }
          alt={name}
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link to={`/products/${id}`}>
            <span className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider">
          <span>{categoryName}</span>
          {subCategoryName && (
            <>
              <span className="mx-2 text-gray-400">•</span>
              <span>{subCategoryName}</span>
            </>
          )}
        </div>
        <Link to={`/products/${id}`}>
          <h3
            className="text-sm font-medium truncate group-hover:underline decoration-gray-300 underline-offset-2"
            title={name}
          >
            {name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-gray-900">
          {currency}
          {typeof price === "number" ? price.toLocaleString() : price}
        </p>
      </div>
    </div>
  );
}