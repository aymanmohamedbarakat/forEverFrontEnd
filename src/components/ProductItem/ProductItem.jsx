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
      <div className="group relative transform transition-all duration-300 hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
          {bestSeller ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-md">
              Top Seller
            </span>
          ) : (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-2 py-1 text-xs font-medium text-white shadow-md">
              New
            </span>
          )}
          
          <img
            src={imgUrl || "/api/placeholder/400/500"}
            alt={name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-0 opacity-0 transition-all duration-300 group-hover:bg-opacity-30 group-hover:opacity-100">
            <Link 
              to={`/products/${id}`}
              className="flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-md transition-all duration-300 hover:bg-gray-100"
            >
              Quick View
            </Link>
          </div>
        </div>
        
        {/* Product info */}
        <div className="mt-3 space-y-1">
          <div className="flex text-xs font-medium text-gray-500">
            <span>{categoryName}</span>
            {subCategoryName && (
              <>
                <span className="mx-1">•</span>
                <span>{subCategoryName}</span>
              </>
            )}
          </div>
          
          <Link to={`/products/${id}`}>
            <h3 className="font-medium text-gray-900 group-hover:underline">{name}</h3>
          </Link>
          
          <p className="font-semibold text-gray-900">
            ${typeof price === "number" ? price.toLocaleString() : price}
          </p>
        </div>
      </div>

    // <div className="group block relative text-gray-700 hover:text-gray-900 transition-colors duration-300">
    //   {/* Product Image Container */}
    //   <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all">
    //     {bestSeller ? (
    //       <span className="absolute top-2 left-2 bg-red-400 hover:scale-105 transition-transform text-white text-xs font-medium px-1.5 py-1 rounded-full z-10 shadow-md">
    //         TopSeller
    //       </span>
    //     ) : (
    //       <span className="absolute top-2 left-2 bg-black hover:scale-105 transition-transform text-white text-xs font-medium px-2 py-1 rounded-full z-10 shadow-md">
    //         New
    //       </span>
    //     )}
    //     <img
    //       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    //       src={
    //         imgUrl ||
    //         "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
    //       }
    //       alt={name}
    //     />
    //     <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
    //       <Link to={`/products/${id}`}>
    //         <span className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
    //           Quick View
    //         </span>
    //       </Link>
    //     </div>
    //   </div>
    //   {/* Product Info */}
    //   <div className="space-y-2">
    //     <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider">
    //       <span>{categoryName}</span>
    //       {subCategoryName && (
    //         <>
    //           <span className="mx-2 text-gray-400">•</span>
    //           <span>{subCategoryName}</span>
    //         </>
    //       )}
    //     </div>
    //     <Link to={`/products/${id}`}>
    //       <h3
    //         className="text-sm font-medium truncate group-hover:underline decoration-gray-300 underline-offset-2"
    //         title={name}
    //       >
    //         {name}
    //       </h3>
    //     </Link>
    //     <p className="text-sm font-semibold text-gray-900">
    //       {currency}
    //       {typeof price === "number" ? price.toLocaleString() : price}
    //     </p>
    //   </div>
    // </div>
  );
}