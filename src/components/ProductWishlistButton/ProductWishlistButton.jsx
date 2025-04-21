// import React, { useState, useEffect } from "react";
// import { CgHeart } from "react-icons/cg";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../../Hooks/authStore";
// import { userWishlistStore } from "../../Hooks/wishlistStore";

// export default function ProductWishlistButton({ productId }) {
//   const { isAuthenticated, currentUser } = useAuthStore();
//   const { isInWishlist, addToWishlist, removeFromWishlist, getWishlistItemId } =
//     userWishlistStore();
//   const [inWishlist, setInWishlist] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated && productId) {
//       setInWishlist(isInWishlist(productId));
//     }
//   }, [isAuthenticated, productId, isInWishlist]);

//   const handleWishlistAction = async () => {
//     if (!isAuthenticated) {
//       toast.info("Please login to add items to your wishlist");
//       navigate("/login");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (inWishlist) {
//         // Remove from wishlist
//         const wishlistItemId = getWishlistItemId(productId);
//         if (wishlistItemId) {
//           await removeFromWishlist(wishlistItemId);
//           setInWishlist(false);
//         }
//       } else {
//         // Add to wishlist
//         await addToWishlist(currentUser.id, productId);
//         setInWishlist(true);
//       }
//     } catch (error) {
//       console.error("Wishlist action failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleWishlistAction}
//       disabled={loading}
//       className={`flex items-center justify-center p-2 transition-colors duration-300 ${
//         inWishlist
//           ? "btn btn-soft text-red-500 hover:text-red-600"
//           : "btn btn-soft text-gray-100 hover:text-red-500"
//       } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//       aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
//     >
//       <CgHeart className={`text-xl ${inWishlist ? "fill-current" : ""}`} />
//       {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
//     </button>
//   );
// }
////////////////////////////////////////////////////
// import React from "react";
// import { useAuthStore } from "../../Hooks/authStore";
// import { userWishlistStore } from "../../Hooks/wishlistStore";
// import { FaHeart } from "react-icons/fa";

// export default function ProductWishlistButton({ productId }) {
//   const { currentUser } = useAuthStore();
//   const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistItemId } =
//     userWishlistStore();

//   const handleWishlistAction = async () => {
//     if (!currentUser || !currentUser.id) {
//       // Redirect to login or show login modal
//       alert("Please login to add items to wishlist");
//       return;
//     }

//     try {
//       const inWishlist = isInWishlist(productId);

//       if (inWishlist) {
//         // Remove from wishlist
//         const wishlistItemId = getWishlistItemId(productId);
//         if (wishlistItemId) {
//           await removeFromWishlist(wishlistItemId);
//         }
//       } else {
//         // Add to wishlist
//         console.log("Adding to wishlist:", currentUser.id, productId);
//         await addToWishlist(currentUser.id, productId);
//       }
//     } catch (error) {
//       console.error("Wishlist action failed:", error);
//     }
//   };

//   const inWishlist = isInWishlist(productId);

//   return (
//     <button
//       onClick={handleWishlistAction}
//       className={`btn ${inWishlist ? "btn-danger" : "btn-light"}`}
//     >
//       <FaHeart className={`mr-2 ${inWishlist ? "text-red-500" : ""}`} />
//       {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
//     </button>
//   );
// }
///////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../Hooks/authStore";
import { userWishlistStore } from "../../Hooks/wishlistStore";
import { FaHeart } from "react-icons/fa";

export default function ProductWishlistButton({ productId }) {
  const { isAuthenticated, currentUser } = useAuthStore();
  const { 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    getWishlistItemId 
  } = userWishlistStore();
  
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check wishlist status whenever component mounts or auth/product changes
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
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        const result = await addToWishlist(currentUser.id, productId);
        if (result) {
          setInWishlist(true);
          toast.success("Added to wishlist");
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
      <FaHeart className={`mr-2 ${inWishlist ? "text-red-500" : "text-gray-400"}`} />
      {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}