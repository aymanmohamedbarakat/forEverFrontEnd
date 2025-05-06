import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
import { toast } from "react-toastify";
import { orderRepo } from "../data/Repo/OrderRepo";

export const useCheckOutStore = create((set, get) => ({
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  },

  method: "cod",
  setFormData: (data) => set({ formData: data }),
  setMethod: (paymentMethod) => set({ method: paymentMethod }),

  handlePlaceOrder: async () => {
    try {
      const { formData, method } = get();
      // Validate address information
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.street ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode ||
        !formData.country ||
        !formData.phone
      ) {
        toast.error("Please complete your address information");
        throw new Error("Address information incomplete");
      }
      const addressInformation = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;

      const { currentUser, authToken } = useAuthStore.getState();
      const { cartItems, clearCart } = useCartStore.getState();

      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty", {
          position: "top-right",
          autoClose: 2000,
        });
        return false;
      }

      if (!currentUser) {
        toast.error("Please log in to place an order");
        throw new Error("User not authenticated");
      }

      const total = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
        0
      );

      const result = await orderRepo.placeOrder(
        cartItems,
        currentUser.id,
        authToken,
        total,
        formData,
        method,
        addressInformation
      );

      if (result.success) {
        clearCart();
        set({ formData: {}, method: "cod" });
        toast.success(
          "Order placed successfully! Thank you for your purchase.",
          {
            autoClose: 1300,
          }
        );
        return true;
      } else {
        toast.error("Unable to place your order. Please try again.");
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Failed to place order");
      return false;
    }
  },
}));
