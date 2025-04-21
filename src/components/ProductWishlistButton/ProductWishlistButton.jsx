import React, { useState, useEffect } from "react";
import { CgHeart } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../Hooks/authStore";
import { userWishlistStore } from "../../Hooks/wishlistStore";

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
        await addToWishlist(currentUser.id, productId);
        setInWishlist(true);
      }
    } catch (error) {
      console.error("Wishlist action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistAction}
      disabled={loading}
      className={`flex items-center justify-center p-2 transition-colors duration-300 ${
        inWishlist
          ? "btn btn-soft text-red-500 hover:text-red-600"
          : "btn btn-soft text-gray-100 hover:text-red-500"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <CgHeart className={`text-xl ${inWishlist ? "fill-current" : ""}`} />
      {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}
