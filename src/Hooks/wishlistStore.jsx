import { create } from "zustand";
import { WishlistRepo } from "../data/Repo/Wishlist";
import { toast } from "react-toastify";

export const userWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  getWishlists: async (userId) => {
    try {
      set({ loading: true });
      const data = await WishlistRepo.getAllWishlists(userId);
      set({ wishlist: data?.data || [], loading: false }); // Note: using data.data to match API response
      return data;
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
        toast.info("Item already in wishlist");
        return false;
      }

      const response = await WishlistRepo.addToWishlist(userId, productId);
      if (response?.data) {
        set((state) => ({ 
          wishlist: [...state.wishlist, response.data] 
        }));
        toast.success("Added to wishlist");
        return true;
      }

      return false;
    } catch (error) {
      toast.error("Failed to add item to wishlist");
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

      return false;
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
      return false;
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(
      (item) => item.product?.id === productId
    );
  },

  getWishlistItemId: (productId) => {
    const item = get().wishlist.find(
      (item) => item.product?.id === productId  // Changed to match actual structure
    );
    return item ? item.id : null;
  },

  clearWishlists: () => set({ wishlist: [] }), // Fixed typo (was wishlists)
}));