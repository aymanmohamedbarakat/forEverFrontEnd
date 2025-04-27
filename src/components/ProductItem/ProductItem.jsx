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
  // Extract category and sub-category names, handling null/undefined values
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
// <Link className="text-gray-700 cursor-pointer" to={`/products/${id}`}>
//   <div className="overflow-hidden">
// <img
//   className="hover:scale-110 transition ease-in-out"
//   src={
//     imgUrl ||
//     "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
//   }
//   alt=""
// />
//   </div>
//   <p className="pt-3 pb-1 text-sm">{name}</p>
//   <p className="text-sm font-medium">
//     {currency}
//     {price}
//   </p>
// </Link>
// bestSellerOffer
// :
// true
// category
// :
// {id: 10, documentId: 'qjfvtnreb45xk9pt17t15bu2', createdAt: '2025-04-13T14:41:30.589Z', updatedAt: '2025-04-20T20:12:15.599Z', publishedAt: '2025-04-20T20:12:15.625Z', …}
// createdAt
// :
// "2025-04-20T20:11:32.006Z"
// date
// :
// null
// description
// :
// "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."
// documentId
// :
// "ol7de43emi9u18ajoe0oxg74"
// id
// :
// 329
// image
// :
// [{…}]
// name
// :
// "Women Round Neck Cotton Top"
// price
// :
// 100
// publishedAt
// :
// "2025-04-27T19:33:35.440Z"
// size
// :
// {id: 18, documentId: 'rykkpywpn905omdku6qpgtjh', createdAt: '2025-04-20T22:36:04.406Z', updatedAt: '2025-04-20T22:40:32.748Z', publishedAt: '2025-04-20T22:40:32.765Z', …}
// sub_category
// :
// {id: 16, documentId: 'u0cq14hy6l6etfi1rcizgyot', createdAt: '2025-04-13T14:51:29.342Z', updatedAt: '2025-04-20T22:17:40.575Z', publishedAt: '2025-04-20T22:17:40.594Z', …}
// updatedAt
// :
// "2025-04-27T19:33:35.415Z"
// wishlists
// :
// []
