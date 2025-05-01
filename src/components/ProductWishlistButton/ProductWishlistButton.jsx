import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { useAuthStore, userWishlistStore } from "../../store";

export default function ProductWishlistButton({ productId }) {
  const { isAuthenticated, currentUser } = useAuthStore();
  const { isInWishlist, addToWishlist, removeFromWishlist, getWishlistItemId } =
    userWishlistStore();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && productId) {
      setInWishlist(isInWishlist(productId));
    }
  }, [isAuthenticated, productId, isInWishlist]);

  const handleWishlistAction = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to your wishlist");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      if (inWishlist) {
        // Remove from wishlist
        const wishlistItemId = getWishlistItemId(productId);
        if (wishlistItemId) {
          await removeFromWishlist(wishlistItemId);
          setInWishlist(false);
        }
      } else {
        // Add to wishlist
        const result = await addToWishlist(currentUser.id, productId);
        if (result) {
          setInWishlist(true);
        }
      }
    } catch (error) {
      console.error("Wishlist action failed:", error);
      toast.error("Wishlist action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistAction}
      disabled={loading}
      className={`flex items-center justify-center p-2 rounded transition-all duration-300 ${
        inWishlist
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FaHeart
        className={`mr-2 ${inWishlist ? "text-red-500" : "text-gray-400"}`}
      />
      {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}
