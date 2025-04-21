// import axios from "axios";
// import { domain } from "../../store";

// export const userWishlist = async (userId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(`${domain}/api/wishlists?populate=*`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     //   params: {
//     //     filters: {
//     //       user: {
//     //         id: {
//     //           $eq: userId,
//     //         },
//     //       },
//     //     },
//     //   },
//     });
//     console.log(response.data);
//     console.log("hello")
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching wishlist data:", error);
//     console.log("Response details:", error.response);
//     throw error;
//   }
// };

// export const addToUserWishlist = async (userId, productId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.post(
//       `${domain}/api/wishlists`,
//       {
//         data: {
//           user: userId,
//           products: [productId], // ✅ الصح
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("User ID being passed:", userId);

//     return res.data.data;
//   } catch (err) {
//     console.error("Error adding to wishlist:", err);
//     throw err;
//   }
// };

// export const removeFromUserWishlist = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.delete(`${domain}/api/wishlists/${wishlistItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return true;
//   } catch (err) {
//     console.error("Error removing from wishlist:", err);
//     throw err;
//   }
// };

// export const getWishlistItem = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${domain}/api/wishlists/${wishlistItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data.data;
//   } catch (err) {
//     console.error("Error getting wishlist item:", err);
//     throw err;
//   }
// };
/////////////////////////////////////////////////////

// import axios from "axios";
// import { domain } from "../../store";

// export const userWishlist = async (userId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(`${domain}/api/wishlists?populate=*`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         filters: {
//           user: {
//             id: {
//               $eq: userId,
//             },
//           },
//         },
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching wishlist data:", error);
//     console.log("Response details:", error.response);
//     throw error;
//   }
// };

// export const addToUserWishlist = async (userId, productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${domain}/api/wishlists`,
//         {
//           data: {
//             user: userId,
//             // Format for Strapi v4
//             product: productId
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("User ID being passed:", userId);
//       return res.data;
//     } catch (err) {
//       console.error("Error adding to wishlist:", err);
//       console.log("Response error details:", err.response?.data);
//       throw err;
//     }
//   };

// export const removeFromUserWishlist = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.delete(`${domain}/api/wishlists/${wishlistItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return true;
//   } catch (err) {
//     console.error("Error removing from wishlist:", err);
//     throw err;
//   }
// };

// export const getWishlistItem = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${domain}/api/wishlists/${wishlistItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data.data;
//   } catch (err) {
//     console.error("Error getting wishlist item:", err);
//     throw err;
//   }
// };
//////////////////////////////////////////////////////////

// import axios from "axios";
// import { domain } from "../../store";

// export const userWishlist = async (userId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(`${domain}/api/wishlists`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         populate: '*', // Populate all relations
//         'filters[user][id][$eq]': userId
//       }
//     });
//     console.log(response.data.data)
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching wishlist data:", error);
//     throw error;
//   }
// };

// export const addToUserWishlist = async (userId, productId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await axios.post(
//       `${domain}/api/wishlists`,
//       {
//         data: {
//           user: userId,
//           product: productId
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(res.data)
//     return res.data;
//   } catch (err) {
//     console.error("Error adding to wishlist:", err);
//     throw err;
//   }
// };

// export const removeFromUserWishlist = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");

//     await axios.delete(`${domain}/api/wishlists/${wishlistItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return true;
//   } catch (err) {
//     console.error("Error removing from wishlist:", err);
//     throw err;
//   }
// };

// export const getWishlistItem = async (wishlistItemId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(`${domain}/api/wishlists/${wishlistItemId}?populate=*`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.error("Error getting wishlist item:", err);
//     throw err;
//   }
// };

//////////////////////////////////////////

import axios from "axios";
import { domain } from "../../store";

export const userWishlist = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${domain}/api/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        // Deep populate all relations including product, category, subcategory, image
        populate: {
          product: {
            populate: "*",
          },
          user: true,
        },
        "filters[user][id][$eq]": userId,
      },
    });

    console.log("Wishlist data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
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

    console.log("Removal response:", response);
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
