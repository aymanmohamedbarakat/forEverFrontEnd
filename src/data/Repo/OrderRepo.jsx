import {
  addOrderItem,
  createOrders,
} from "../apis/Orders/order_index";
import {
  getOrderById,
  getOrderItems,
  getUserOrders,
} from "../apis/Orders/user_order";
export const orderRepo = {
  placeOrder: async (
    cartItems,
    userId,
    token,
    formData,
    paymentMethod,
    addressInformation
  ) => {
    console.log("Starting order placement:", {
      userId,
      cartItems: cartItems.length,
      hasToken: !!token,
    });

    try {
      const orderData = await createOrders(
        userId,
        token,
        addressInformation,
        formData,
        paymentMethod
      );

      if (!orderData) {
        throw new Error("Failed to get order ID from server");
      }

      const orderId = orderData.id;
      // console.log("Order created with ID:", orderId);
      for (const item of cartItems) {
        // console.log("Processing item:", item);
        await addOrderItem({
          orderId: orderId,
          productId: item.documentId,
          quantity: item.quantity,
          size: item.size,
          userId: userId,
          token: token,
        });
      }
      // console.log("Order placed successfully!");
      return { success: true, orderId };
    } catch (error) {
      // console.error("Error in placeOrder:", error);
      throw error;
    }
  },

  getOrder: async (userId, token) => {
    return await getUserOrders(userId, token);
  },

  getOrderItems: async (orderId, token) => {
    return await getOrderItems(orderId, token);
  },

  getOrderDetailsById: async (orderId, token) => {
    return await getOrderById(orderId, token);
  },
};
