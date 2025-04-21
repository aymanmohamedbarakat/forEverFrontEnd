import {
  addToUserWishlist,
  getWishlistItem,
  removeFromUserWishlist,
  userWishlist,
} from "../apis/wishlist_user";

export const WishlistRepo = {
  getAllWishlists: async (userId) => {
    return userWishlist(userId);
  },

  addToWishlist: async (userId, productId) => {
    return addToUserWishlist(userId, productId);
  },

  removeFromWishlist: async (wishlistItemId) => {
    return removeFromUserWishlist(wishlistItemId);
  },

  getWishlistItem: async (wishlistItemId) => {
    return getWishlistItem(wishlistItemId);
  },
};
