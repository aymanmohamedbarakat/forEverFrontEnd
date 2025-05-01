import axios from "axios";
import { domain } from "../../../store";

export const userWishlist = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${domain}/api/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: {
          product: {
            populate: "*",
          },
          user: true,
        },
        filters: {
          user: {
            id: {
              $eq: userId,
            },
          },
        },
      },
    });

    // console.log("Wishlist data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error;
  }
};

export const getWishlistItem = async (wishlistItemId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${domain}/api/wishlists/${wishlistItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: {
          product: {
            populate: "*",
          },
        },
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error getting wishlist item:", err);
    throw err;
  }
};
