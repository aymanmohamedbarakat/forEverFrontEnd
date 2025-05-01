import axios from "axios";
import { domain } from "../../../store";

export const addToUserWishlist = async (userId, productId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${domain}/api/wishlists`,
      {
        data: {
          user: userId,
          product: productId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    throw err;
  }
};

export const removeFromUserWishlist = async (wishlistItemDocumentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${domain}/api/wishlists/${wishlistItemDocumentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Removal response:", response);
    return true;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    throw err;
  }
};

// export const clearAllUserWishlist = async (userId) => {
//   try {
//     const token = localStorage.getItem("token");

//     // First get all wishlist items for this user
//     const response = await axios.get(`${domain}/api/wishlists`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         "filters[user][id][$eq]": userId,
//       },
//     });

//     const wishlistItems = response.data.data || [];
//     console.log("Items to delete:", wishlistItems.length);

//     if (wishlistItems.length === 0) {
//       return true;
//     }

//     // Delete each item one by one
//     for (const item of wishlistItems) {
//       try {
//         console.log(`Deleting wishlist item ID: ${item.id}`);
//         await axios.delete(`${domain}/api/wishlists/${item.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } catch (deleteErr) {
//         console.error(`Failed to delete wishlist item ${item.id}:`, deleteErr);
//         // Continue with other deletions even if one fails
//       }
//     }

//     return true;
//   } catch (err) {
//     console.error("Error clearing wishlist:", err);
//     throw err;
//   }
// };
