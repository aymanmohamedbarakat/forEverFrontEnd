import { toast } from "react-toastify";
import { create } from "zustand";
let savedCart = [];
try {
  savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
} catch (e) {
  console.error("Failed to parse cartItems:", e);
}
export const useCartStore = create((set, get) => ({
  cartItems: savedCart,

  addToCart: (itemId, size , price) => {
      if (!size) {
        toast.error("Please select a size", {
          position: "top-right",
          autoClose: 1200,
        });
        return;
      }


    const cart = [...get().cartItems];
    const existingItem = cart.findIndex(
      (item) => item.documentId === itemId && item.size === size
    );

    if (existingItem !== -1) {
      cart[existingItem].quantity += 1;
      toast.info("Item quantity increased", {
        position: "top-right",
        autoClose: 1200,
      });
    } else {
      cart.push({ documentId: itemId, size, quantity: 1, price });
      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 1200,
      });
    }
    set({ cartItems: cart });
    localStorage.setItem("cartItems", JSON.stringify(cart));
  },

  removeFromCart: (itemId, size) => {
    const cart = get().cartItems.filter(
      (item) => item.documentId !== itemId || item.size !== size
    );
    set({ cartItems: cart });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 1200,
    });
  },

  updateQuantity: (itemId, size, quantity) => {
    const cart = [...get().cartItems];
    const itemIndex = cart.findIndex(
      (item) => item.documentId === itemId && item.size === size
    );
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      set({ cartItems: cart });
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  },

  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getCartAmount: (products) => {
    const cart = get().cartItems;
    let total = 0;
    cart.forEach(({ documentId, quantity }) => {
      const product = products.find(
        (productItem) => productItem.documentId === documentId
      );
      if (product && product.price) {
        total += product.price * quantity;
      } 
    });
    return total;
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cartItems");
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 1200,
    });
  },
}));
