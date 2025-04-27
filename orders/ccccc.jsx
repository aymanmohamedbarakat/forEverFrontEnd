import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
import { OrderRepo } from "../data/Repo/OrderRepo";
import { toast } from "react-toastify";

export const useCheckOutStore = create((set, get) => ({
  formData: {},
  method: "cod",

  setFormData: (data) => set({ formData: data }),
  setMethod: (paymentMethod) => set({ method: paymentMethod }),

  handlePlaceOrder: async () => {
    try {
      const { currentUser, authToken } = useAuthStore.getState();
      const { cartItems, clearCart } = useCartStore.getState();

      // Validate essential data
      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        throw new Error("Cart is empty");
      }

      if (!currentUser) {
        toast.error("Please log in to place an order");
        throw new Error("User not authenticated");
      }

      const { formData } = get();

      // Validate address information
      if (
        !formData.street ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode ||
        !formData.country
      ) {
        toast.error("Please complete your address information");
        throw new Error("Address information incomplete");
      }

      // Format the address string
      const address = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;

      // Use the OrderRepo to place the order with address
      const result = await OrderRepo.placeOrder(
        currentUser.id,
        cartItems,
        authToken,
        address
      );

      if (result.success) {
        clearCart();
        set({ formData: {}, method: "cod" });
        toast.success("Order placed successfully! Thank you for your purchase.");
        return true;
      } else {
        toast.error("Unable to place your order. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("❌ handlePlaceOrder error:", error);
      toast.error(error.message || "Failed to place order");
      return false;
    }
  },
}));