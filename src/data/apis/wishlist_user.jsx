import axios from "axios";
import { domain } from "../../store";

export const userWishlist = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${domain}/api/wishlists?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    //   params: {
    //     filters: {
    //       user: {
    //         id: {
    //           $eq: userId,
    //         },
    //       },
    //     },
    //   },
    });
    console.log(response.data);
    console.log("hello")
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    console.log("Response details:", error.response);
    throw error;
  }
};

export const addToUserWishlist = async (userId, productId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${domain}/api/wishlists`,
      {
        data: {
          user: userId,
          products: [productId], // ✅ الصح
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User ID being passed:", userId);

    return res.data.data;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    throw err;
  }
};

export const removeFromUserWishlist = async (wishlistItemId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${domain}/api/wishlists/${wishlistItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    throw err;
  }
};

export const getWishlistItem = async (wishlistItemId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${domain}/api/wishlists/${wishlistItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error("Error getting wishlist item:", err);
    throw err;
  }
};
