import React, { useEffect } from "react";
import { useAuthStore } from "../Hooks/authStore";
import { userWishlistStore } from "../Hooks/wishlistStore";

export default function WishlistPage() {
  const { currentUser } = useAuthStore();
  const { wishlist, getWishlists } = userWishlistStore();

  useEffect(() => {
    if (currentUser?.id) {
      getWishlists(currentUser.id);
    }
  }, [currentUser, getWishlists]);

  // Transform the data structure to match what your component expects
  const transformedWishlist = wishlist.map(item => ({
    id: item.id,
    attributes: {
      name: `Wishlist Item ${item.id}`, // You might want to give it a better name
      products: {
        data: [{
          id: item.product?.id,
          attributes: {
            title: item.product?.name || 'Unnamed Product',
            // Add other product attributes you need
          }
        }]
      }
    }
  }));

  return (
    <div>
      <h1>Your Wishlists</h1>
      {transformedWishlist.length > 0 ? (
        transformedWishlist.map((wishlistItem) => (
          <div key={wishlistItem.documentId}>
            <h3>{wishlistItem.attributes.name}</h3>
            <ul>
              {wishlistItem.attributes.products.data.map((product) => (
                <li key={product.id}>{product.attributes.title}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No wishlists found.</p>
      )}
    </div>
  );
}