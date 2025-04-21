// import React, { useEffect } from "react";
// import { useAuthStore } from "../Hooks/authStore";
// import { userWishlistStore } from "../Hooks/wishlistStore";

// export default function WishlistPage() {
//   const { currentUser } = useAuthStore();
//   const { wishlist, getWishlists } = userWishlistStore();

//   useEffect(() => {
//     if (currentUser?.id) {
//       getWishlists(currentUser.id);
//     }
//   }, [currentUser, getWishlists]);

//   // Transform the data structure to match what your component expects
//   const transformedWishlist = wishlist.map(item => ({
//     id: item.id,
//     attributes: {
//       name: `Wishlist Item ${item.id}`, // You might want to give it a better name
//       products: {
//         data: [{
//           id: item.product?.id,
//           attributes: {
//             title: item.product?.name || 'Unnamed Product',
//             // Add other product attributes you need
//           }
//         }]
//       }
//     }
//   }));

//   return (
//     <div>
//       <h1>Your Wishlists</h1>
//       {transformedWishlist.length > 0 ? (
//         transformedWishlist.map((wishlistItem) => (
//           <div key={wishlistItem.documentId}>
//             <h3>{wishlistItem.attributes.name}</h3>
//             <ul>
//               {wishlistItem.attributes.products.data.map((product) => (
//                 <li key={product.id}>{product.attributes.title}</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No wishlists found.</p>
//       )}
//     </div>
//   );
// }
/////////////////////////////////////////////

// import React, { useEffect } from "react";
// import { useAuthStore } from "../Hooks/authStore";
// import { userWishlistStore } from "../Hooks/wishlistStore";
// import { domain } from "../store";

// export default function WishlistPage() {
//   const { currentUser } = useAuthStore();
//   const { wishlist, getWishlists, removeFromWishlist } = userWishlistStore();

//   useEffect(() => {
//     if (currentUser?.id) {
//       getWishlists(currentUser.id);
//     }
//   }, [currentUser, getWishlists]);

//   if (!wishlist || wishlist.length === 0) {
//     return (
//       <div className="container mx-auto py-10">
//         <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
//         <p>No items in your wishlist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {wishlist.map((item) => (
//           <div key={item.id} className="border rounded-lg p-4 shadow-sm">
//             {item.product && (
//               <>
//                 {item.product.image && item.product.image[0] && (
//                   <img
//                     src={`${domain}${item.product.image[0].url}`}
//                     alt={item.product.name}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                 )}
//                 <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
//                 <p className="text-gray-700 mb-2">${item.product.price}</p>
//                 <div className="flex justify-between mt-4">
//                   <button
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                     onClick={() => {
//                       // Navigate to product page
//                       window.location.href = `/product/${item.product.documentId}`;
//                     }}
//                   >
//                     View Product
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-600 text-white rounded-md"
//                     onClick={() => removeFromWishlist(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </>
//             )}
//             {!item.product && (
//               <p className="text-red-500">Product no longer available</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

///////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../Hooks/authStore";
// import { userWishlistStore } from "../Hooks/wishlistStore";
// import { domain } from "../store";

// export default function WishlistPage() {
//   const navigate = useNavigate();
//   const { currentUser, isAuthenticated } = useAuthStore();
//   const { wishlist, getWishlists, removeFromWishlist, loading } = userWishlistStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadWishlist = async () => {
//       setIsLoading(true);
//       if (currentUser?.id) {
//         await getWishlists(currentUser.id);
//       }
//       setIsLoading(false);
//     };

//     if (isAuthenticated) {
//       loadWishlist();
//     } else {
//       navigate('/login', { state: { from: '/wishlist' } });
//     }
//   }, [currentUser, getWishlists, isAuthenticated, navigate]);

//   const handleRemoveItem = async (itemId) => {
//     await removeFromWishlist(itemId);
//   };

//   const navigateToProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   if (isLoading || loading) {
//     return (
//       <div className="container mx-auto py-16 px-4">
//         <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!wishlist || wishlist.length === 0) {
//     return (
//       <div className="container mx-auto py-16 px-4">
//         <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
//         <div className="bg-gray-50 rounded-lg p-8 text-center">
//           <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
//           <button
//             onClick={() => navigate('/shopping')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
//           >
//             Browse Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-16 px-4">
//       <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {wishlist.map((item) => (
//           <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
//             {item.product && (
//               <>
//                 {item.product.image && item.product.image.length > 0 && (
//                   <div className="h-48 overflow-hidden">
//                     <img
//                       src={`${domain}${item.product.image[0].url}`}
//                       alt={item.product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>

//                   {/* Category and subcategory badges */}
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {item.product.category && (
//                       <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                         {item.product.category.name}
//                       </span>
//                     )}
//                     {item.product.sub_category && (
//                       <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
//                         {item.product.sub_category.name}
//                       </span>
//                     )}
//                     {item.product.bestseller && item.product.bestseller.featured && (
//                       <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
//                         Bestseller
//                       </span>
//                     )}
//                   </div>

//                   <p className="text-gray-700 mb-2 font-semibold">${item.product.price}</p>

//                   {/* Size info if available */}
//                   {item.product.size && (
//                     <p className="text-sm text-gray-500 mb-2">
//                       Size: {item.product.size.name}
//                     </p>
//                   )}

//                   {item.product.description && (
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {item.product.description}
//                     </p>
//                   )}

//                   <div className="flex justify-between mt-4">
//                     <button
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                       onClick={() => navigateToProduct(item.product.documentId)}
//                     >
//                       View Product
//                     </button>
//                     <button
//                       className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//                       onClick={() => handleRemoveItem(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//             {!item.product && (
//               <div className="p-4">
//                 <p className="text-red-500">Product no longer available</p>
//                 <button
//                   className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//                   onClick={() => handleRemoveItem(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

///////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Hooks/authStore";
import { userWishlistStore } from "../Hooks/wishlistStore";
import { domain } from "../store";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuthStore();
  const { wishlist, getWishlists, removeFromWishlist, loading } =
    userWishlistStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      if (currentUser?.documentId) {
        await getWishlists(currentUser.id);
      }
      setIsLoading(false);
    };

    if (isAuthenticated) {
      loadWishlist();
    } else {
      navigate("/login", { state: { from: "/wishlist" } });
    }
  }, [currentUser, getWishlists, isAuthenticated, navigate]);

  const handleRemoveItem = async (wishlistItemId) => {
    console.log("Removing item with ID:", wishlistItemId);
    await removeFromWishlist(wishlistItemId);
  };

  const navigateToProduct = (productId) => {
    // Fix: Navigate to correct product path
    navigate(`/products/${productId}`);
  };

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
          <button
            onClick={() => navigate("/shopping")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-sm bg-white"
          >
            {item.product && (
              <>
                {item.product.image && item.product.image.length > 0 && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${domain}${item.product.image[0].url}`}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/320";
                        e.target.alt = "Image not available";
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">
                    {item.product.name}
                  </h3>

                  {/* Category and subcategory badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.product.category && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {item.product.category.name}
                      </span>
                    )}
                    {item.product.sub_category && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {item.product.sub_category.name}
                      </span>
                    )}
                    {item.product.bestseller &&
                      item.product.bestseller.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                  </div>

                  <p className="text-gray-700 mb-2 font-semibold">
                    ${item.product.price}
                  </p>

                  {/* Size info if available */}
                  {item.product.size && (
                    <p className="text-sm text-gray-500 mb-2">
                      Size: {item.product.size.name}
                    </p>
                  )}

                  {item.product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.product.description}
                    </p>
                  )}

                  <div className="flex justify-between mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        navigateToProduct(
                          item.product.documentId || item.product.id
                        )
                      }
                    >
                      View Product
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      onClick={() => handleRemoveItem(item.documentId)} // id
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            )}
            {!item.product && (
              <div className="p-4">
                <p className="text-red-500">Product no longer available</p>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveItem(item.documentId)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
