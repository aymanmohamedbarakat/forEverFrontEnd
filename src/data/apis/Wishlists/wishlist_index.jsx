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

    return true;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    throw err;
  }
};
