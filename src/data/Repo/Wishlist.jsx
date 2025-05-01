import { getWishlistItem, userWishlist } from "../apis/Wishlists/user_wishlist";
import {
  addToUserWishlist,
  removeFromUserWishlist,
} from "../apis/Wishlists/wishlist_index";

export const WishlistRepo = {
  getAllWishlists: async (userId) => {
    return userWishlist(userId);
  },

  addToWishlist: async (userId, productId) => {
    return addToUserWishlist(userId, productId);
  },

  removeFromWishlist: async (wishlistItemDocumentId) => {
    return removeFromUserWishlist(wishlistItemDocumentId);
  },

  getWishlistItem: async (wishlistItemId) => {
    return getWishlistItem(wishlistItemId);
  },

  // clearAllWishlists: async (userId) => {
  //   return clearAllUserWishlist(userId);
  // },
};
