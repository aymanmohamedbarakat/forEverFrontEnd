import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Hooks/authStore";
import { userWishlistStore } from "../Hooks/wishlistStore";
import { domain } from "../store";
import Title from "../components/Title/Title";
import {
  ArrowRight,
  Eye,
  HeartOff,
  RefreshCcw,
  ShoppingBag,
} from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuthStore();
  const {
    wishlist,
    getWishlists,
    removeFromWishlist,
    loading,
    clearWishlists,
  } = userWishlistStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isClearingWishlist, setIsClearingWishlist] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      if (currentUser?.id) {
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

  // const handleClearWishlist = async () => {
  //   if (
  //     window.confirm("Are you sure you want to clear your entire wishlist?")
  //   ) {
  //     setIsClearingWishlist(true);

  //     if (currentUser?.id) {
  //       await clearWishlists(currentUser.id);

  //       // Force refresh the wishlist to ensure it's truly empty
  //       await getWishlists(currentUser.id);
  //     }

  //     setIsClearingWishlist(false);
  //   }
  // };

  const navigateToProduct = (productId) => {
    // Fix: Navigate to correct product path
    navigate(`/products/${productId}`);
  };

  const isWishlistEmpty = wishlist.length === 0;

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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-t border-gray-300 pt-8">
          <div className="flex justify-between items-center mb-6">
            <Title text1={"YOUR"} text2={"WISHLIST"} />

            {/* {!isWishlistEmpty && (
              <button
                onClick={handleClearWishlist}
                disabled={isClearingWishlist}
                className={`flex items-center ${
                  isClearingWishlist
                    ? "text-gray-400"
                    : "text-gray-500 hover:text-red-500"
                } transition-colors text-sm`}
              >
                <RefreshCcw
                  size={16}
                  className={`mr-1 ${isClearingWishlist ? "animate-spin" : ""}`}
                />
                {isClearingWishlist ? "Clearing..." : "Clear Wishlist"}
              </button>
            )} */}
          </div>

          {isWishlistEmpty ? (
            <div className="py-16 text-center">
              <div className="flex justify-center mb-4">
                <HeartOff size={64} className="text-gray-300" />
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Your WishList is empty
              </p>
              <button
                onClick={() => navigate("/shopping")}
                className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors flex items-center mx-auto"
              >
                CONTINUE SHOPPING
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {wishlist.map((item) => (
                <div
                  key={item.documentId || item.id}
                  className="border border-gray-200 p-4 flex flex-col"
                >
                  <div className="relative group">
                    <img
                      src={`${domain}${item.product.image[0].url}`}
                      alt={item.product.name}
                      className="w-full h-75 object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/320";
                        e.target.alt = "Image not available";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() =>
                          handleRemoveItem(item.documentId || item.id)
                        }
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <HeartOff size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium cursor-pointer line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-700 mb-2 font-semibold">
                      ${item.product.price.toFixed(2)}
                    </p>
                    {item.product.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.product.description}
                      </p>
                    )}
                    <button
                      className="btn btn-soft w-full"
                      onClick={() =>
                        navigateToProduct(
                          item.product.documentId || item.product.id
                        )
                      }
                    >
                      <Eye size={16} /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
