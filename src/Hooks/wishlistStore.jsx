// import { create } from "zustand";
// import { WishlistRepo } from "../data/Repo/Wishlist";
// import { toast } from "react-toastify";

// export const userWishlistStore = create((set, get) => ({
//   wishlist: [],
//   loading: false,

//   getWishlists: async (userId) => {
//     try {
//       set({ loading: true });
//       const data = await WishlistRepo.getAllWishlists(userId);
//       set({ wishlist: data?.data || [], loading: false }); // Note: using data.data to match API response
//       return data;
//     } catch (error) {
//       toast.error("Failed to fetch wishlist items");
//       set({ loading: false });
//       return [];
//     }
//   },

//   addToWishlist: async (userId, productId) => {
//     try {
//       // Check if item is already in wishlist
//       if (get().isInWishlist(productId)) {
//         toast.info("Item already in wishlist");
//         return false;
//       }

//       const response = await WishlistRepo.addToWishlist(userId, productId);
//       if (response?.data) {
//         set((state) => ({
//           wishlist: [...state.wishlist, response.data]
//         }));
//         toast.success("Added to wishlist");
//         return true;
//       }

//       return false;
//     } catch (error) {
//       toast.error("Failed to add item to wishlist");
//       return false;
//     }
//   },

//   removeFromWishlist: async (wishlistItemId) => {
//     try {
//       const success = await WishlistRepo.removeFromWishlist(wishlistItemId);
//       if (success) {
//         set((state) => ({
//           wishlist: state.wishlist.filter((item) => item.id !== wishlistItemId),
//         }));
//         toast.success("Removed from wishlist");
//         return true;
//       }

//       return false;
//     } catch (error) {
//       toast.error("Failed to remove item from wishlist");
//       return false;
//     }
//   },

//   isInWishlist: (productId) => {
//     return get().wishlist.some(
//       (item) => item.product?.id === productId
//     );
//   },

//   getWishlistItemId: (productId) => {
//     const item = get().wishlist.find(
//       (item) => item.product?.id === productId  // Changed to match actual structure
//     );
//     return item ? item.id : null;
//   },

//   clearWishlists: () => set({ wishlist: [] }), // Fixed typo (was wishlists)
// }));
/////////////////////////////////////////////////////////
// import { create } from "zustand";
// import { WishlistRepo } from "../data/Repo/Wishlist";
// import { toast } from "react-toastify";

// export const userWishlistStore = create((set, get) => ({
//   wishlist: [],
//   loading: false,

//   getWishlists: async (userId) => {
//     try {
//       set({ loading: true });
//       const response = await WishlistRepo.getAllWishlists(userId);

//       if (response?.data) {
//         // Process the response data
//         const formattedWishlist = response.data.map((item) => ({
//           id: item.id,
//           ...item.attributes,
//           product: item.attributes?.product?.data
//             ? {
//                 id: item.attributes.product.data.id,
//                 ...item.attributes.product.data.attributes,
//                 documentId: item.attributes.product.data.id,
//               }
//             : null,
//         }));

//         set({ wishlist: formattedWishlist, loading: false });
//         return formattedWishlist;
//       }

//       set({ loading: false });
//       return [];
//     } catch (error) {
//       toast.error("Failed to fetch wishlist items");
//       set({ loading: false });
//       return [];
//     }
//   },

//   addToWishlist: async (userId, productId) => {
//     try {
//       // Check if item is already in wishlist
//       if (get().isInWishlist(productId)) {
//         toast.info("Item already in wishlist");
//         return false;
//       }

//       console.log("Adding to wishlist with:", { userId, productId });
//       const response = await WishlistRepo.addToWishlist(userId, productId);
//       console.log("Wishlist add response:", response);

//       if (response?.data) {
//         // Get the product details
//         await get().getWishlists(userId);
//         toast.success("Added to wishlist");
//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error("Failed to add item to wishlist:", error);
//       console.error("Error response:", error.response?.data);
//       toast.error("Failed to add item to wishlist");
//       return false;
//     }
//   },

//   removeFromWishlist: async (wishlistItemId) => {
//     try {
//       const success = await WishlistRepo.removeFromWishlist(wishlistItemId);
//       if (success) {
//         set((state) => ({
//           wishlist: state.wishlist.filter((item) => item.id !== wishlistItemId),
//         }));
//         toast.success("Removed from wishlist");
//         return true;
//       }

//       return false;
//     } catch (error) {
//       toast.error("Failed to remove item from wishlist");
//       return false;
//     }
//   },

//   isInWishlist: (productId) => {
//     return get().wishlist.some(
//       (item) => item.product && item.product.documentId === productId
//     );
//   },

//   getWishlistItemId: (productId) => {
//     const item = get().wishlist.find(
//       (item) => item.product && item.product.documentId === productId
//     );
//     return item ? item.id : null;
//   },

//   clearWishlists: () => set({ wishlist: [] }),
// }));
///////////////////////////////////////////////////////////

// import { create } from "zustand";
// import { WishlistRepo } from "../data/Repo/Wishlist";
// import { toast } from "react-toastify";

// export const userWishlistStore = create((set, get) => ({
//   wishlist: [],
//   loading: false,

//   getWishlists: async (userId) => {
//     try {
//       set({ loading: true });
//       const response = await WishlistRepo.getAllWishlists(userId);
      
//       // Handle the Strapi response format
//       if (response?.data) {
//         // Store the wishlist items directly as they come from the API
//         set({ wishlist: response.data, loading: false });
//         return response.data;
//       }
      
//       set({ loading: false });
//       return [];
//     } catch (error) {
//       console.error("Failed to fetch wishlist items:", error);
//       toast.error("Failed to fetch wishlist items");
//       set({ loading: false });
//       return [];
//     }
//   },

//   addToWishlist: async (userId, productId) => {
//     try {
//       // Check if item is already in wishlist
//       if (get().isInWishlist(productId)) {
//         toast.info("Item already in wishlist");
//         return false;
//       }

//       const response = await WishlistRepo.addToWishlist(userId, productId);
      
//       if (response) {
//         // Refresh wishlist data after adding item
//         await get().getWishlists(userId);
//         return true;
//       }
      
//       return false;
//     } catch (error) {
//       console.error("Failed to add item to wishlist:", error);
//       return false;
//     }
//   },

//   removeFromWishlist: async (wishlistItemId) => {
//     try {
//       const success = await WishlistRepo.removeFromWishlist(wishlistItemId);
      
//       if (success) {
//         set((state) => ({
//           wishlist: state.wishlist.filter((item) => item.id !== wishlistItemId),
//         }));
//         return true;
//       }
      
//       return false;
//     } catch (error) {
//       console.error("Failed to remove item from wishlist:", error);
//       return false;
//     }
//   },

//   isInWishlist: (productId) => {
//     return get().wishlist.some(
//       (item) => item.product && item.product.documentId === productId
//     );
//   },

//   getWishlistItemId: (productId) => {
//     const item = get().wishlist.find(
//       (item) => item.product && item.product.documentId === productId
//     );
//     return item ? item.id : null;
//   },

//   clearWishlists: () => set({ wishlist: [] }),
// }));

/////////////////////////////////



import { create } from "zustand";
import { WishlistRepo } from "../data/Repo/Wishlist";
import { toast } from "react-toastify";

export const userWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  getWishlists: async (userId) => {
    try {
      set({ loading: true });
      const response = await WishlistRepo.getAllWishlists(userId);
      
      if (response) {
        // Process data to ensure proper structure
        const formattedWishlist = response.map(item => {
          const formattedProduct = item.product && {
            ...item.product,
            documentId: item.product.documentId || item.product.id
          };
          
          return {
            ...item,
            product: formattedProduct
          };
        });
        
        set({ wishlist: formattedWishlist, loading: false });
        return formattedWishlist;
      }
      
      set({ loading: false });
      return [];
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
      toast.error("Failed to fetch wishlist items");
      set({ loading: false });
      return [];
    }
  },

  addToWishlist: async (userId, productId) => {
    try {
      // Check if item is already in wishlist
      if (get().isInWishlist(productId)) {
        toast.info("Item already in wishlist");
        return false;
      }

      const response = await WishlistRepo.addToWishlist(userId, productId);
      
      if (response) {
        // Refresh wishlist data after adding item
        await get().getWishlists(userId);
        toast.success("Added to wishlist");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
      toast.error("Failed to add to wishlist");
      return false;
    }
  },

  removeFromWishlist: async (wishlistItemId) => {
    try {
      const success = await WishlistRepo.removeFromWishlist(wishlistItemId);
      
      if (success) {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== wishlistItemId),
        }));
        toast.success("Removed from wishlist");
        return true;
      }
      
      toast.error("Could not remove item");
      return false;
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      toast.error("Failed to remove from wishlist");
      return false;
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(
      (item) => item.product && 
      (item.product.documentId === productId || item.product.id === productId)
    );
  },

  getWishlistItemId: (productId) => {
    const item = get().wishlist.find(
      (item) => item.product && 
      (item.product.documentId === productId || item.product.id === productId)
    );
    return item ? item.id : null;
  },

  clearWishlists: () => set({ wishlist: [] }),
}));