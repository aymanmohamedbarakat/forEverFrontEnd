// import { create } from "zustand";
// import { useAuthStore } from "./authStore";
// import { useCartStore } from "./cartStore";
// import { createOrder } from "../data/apis/create_order";
// import { addOrderItem } from "../data/apis/add_order_item";

// export const useCheckOutStore = create((set, get) => ({
//   formData: {},
//   method: "cod",

//   setFormData: (data) => set({ formData: data }),
//   setMethod: (paymentMethod) => set({ method: paymentMethod }),

//   handlePlaceOrder: async () => {
//     try {
//       const { currentUser, authToken } = useAuthStore.getState();

//       const { cartItems, clearCart } = useCartStore.getState();
//       const { formData, method } = get();
//       console.log("🔐 user:", currentUser);
//       console.log("🔐 authToken:", authToken);
//       if (cartItems.length === 0) throw new Error("Cart is empty");
//       if (!currentUser) throw new Error("User not authenticated");

//       const address = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;

//       const orderRes = await createOrder(
//         currentUser.id,
//         method,
//         address,
//         authToken
//       );
//       const orderId = orderRes?.data?.id;

//       if (!orderId) throw new Error("Order not created");

//       for (const item of cartItems) {
//         await addOrderItem(
//           orderId,
//           item.documentId,
//           item.quantity,
//           item.size,
//           authToken
//         );
//       }

//       clearCart();
//       set({ formData: {}, method: "cod" });

//       return true;
//     } catch (error) {
//       console.error("❌ handlePlaceOrder error:", error);
//       return false;
//     }
//   },
// }));
//////////////////////////////////////
// import { create } from "zustand";
// import { useAuthStore } from "./authStore";
// import { useCartStore } from "./cartStore";
// import { OrderRepo } from "../data/Repo/OrderRepo";
// import { toast } from "react-toastify";

// export const useCheckOutStore = create((set, get) => ({
//   formData: {},
//   method: "cod",

//   setFormData: (data) => set({ formData: data }),
//   setMethod: (paymentMethod) => set({ method: paymentMethod }),

//   handlePlaceOrder: async () => {
//     try {
//       const { currentUser, authToken } = useAuthStore.getState();
//       const { cartItems, clearCart } = useCartStore.getState();

//       // Validate essential data
//       if (cartItems.length === 0) {
//         toast.error("Your cart is empty");
//         throw new Error("Cart is empty");
//       }

//       if (!currentUser) {
//         toast.error("Please log in to place an order");
//         throw new Error("User not authenticated");
//       }

//       const { formData } = get();

//       if (
//         !formData.street ||
//         !formData.city ||
//         !formData.state ||
//         !formData.zipCode ||
//         !formData.country
//       ) {
//         toast.error("Please complete your address information");
//         throw new Error("Address information incomplete");
//       }

//       // Use the OrderRepo to place the order
//       const result = await OrderRepo.placeOrder(
//         currentUser.id,
//         cartItems,
//         authToken
//       );

//       if (result.success) {
//         clearCart();
//         set({ formData: {}, method: "cod" });
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("❌ handlePlaceOrder error:", error);
//       toast.error(error.message || "Failed to place order");
//       return false;
//     }
//   },
// }));
//////////////////////////////////////////////////////////////////
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
