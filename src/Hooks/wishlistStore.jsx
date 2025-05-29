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
        // search for be remove succus but as red 
        toast.warn("Removed from wishlist", {
          autoClose: 1200,
        });
        return true;
      }

      toast.error("Could not remove item");
      return false;
    } catch (error) {

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


}));
