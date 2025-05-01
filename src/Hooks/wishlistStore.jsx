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
        const formattedWishlist = response.map((item) => {
          const formattedProduct = item.product && {
            ...item.product,
            documentId: item.product.documentId || item.product.id,
          };

          return {
            ...item,
            product: formattedProduct,
          };
        });

        set({ wishlist: formattedWishlist, loading: false });
        return formattedWishlist;
      }

      set({ loading: false });
      return [];
    } catch (error) {
      // console.error("Failed to fetch wishlist items:", error);
      toast.error("Failed to fetch wishlist items");
      set({ loading: false });
      return [];
    }
  },

  addToWishlist: async (userId, productId) => {
    try {
      // Check if item is already in wishlist
      if (get().isInWishlist(productId)) {
        toast.info("Item already in wishlist", {
          autoClose: 1200,
        });
        return false;
      }

      const response = await WishlistRepo.addToWishlist(userId, productId);

      if (response) {
        // Refresh wishlist data after adding item
        await get().getWishlists(userId);
        toast.success("Added to wishlist", {
          autoClose: 1200,
        });
        return true;
      }

      return false;
    } catch (error) {
      // console.error("Failed to add item to wishlist:", error);
      toast.error("Failed to add to wishlist");
      return false;
    }
  },

  removeFromWishlist: async (wishlistItemDocumentId) => {
    try {
      const success = await WishlistRepo.removeFromWishlist(
        wishlistItemDocumentId
      );
      if (success) {
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.documentId !== wishlistItemDocumentId
          ),
        }));
        toast.success("Removed from wishlist", {
          autoClose: 1200,
        });
        return true;
      }

      toast.error("Could not remove item");
      return false;
    } catch (error) {
      // console.error("Failed to remove item from wishlist:", error);
      toast.error("Failed to remove from wishlist");
      return false;
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(
      (item) =>
        item.product &&
        (item.product.documentId === productId || item.product.id === productId)
    );
  },

  getWishlistItemId: (productId) => {
    const item = get().wishlist.find(
      (item) =>
        item.product &&
        (item.product.documentId === productId || item.product.id === productId)
    );
    return item ? item.documentId : null;
  },

  // clearWishlists: async (userId) => {
  //   try {
  //     set({ loading: true });

  //     if (!userId) {
  //       toast.error("User not authenticated");
  //       set({ loading: false });
  //       return false;
  //     }

  //     const success = await WishlistRepo.clearAllWishlists(userId);

  //     if (success) {
  //       set({ wishlist: [], loading: false });
  //       toast.success("Wishlist cleared successfully", {
  //         autoClose: 1200,
  //       });
  //       return true;
  //     }

  //     set({ loading: false });
  //     return false;
  //   } catch (error) {
  //     console.error("Failed to clear wishlist:", error);
  //     toast.error("Failed to clear wishlist");
  //     set({ loading: false });
  //     return false;
  //   }
  // },
}));
