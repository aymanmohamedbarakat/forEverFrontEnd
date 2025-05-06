import {
  addOrderItem,
  createOrders,
  updateOrderWithItems,
} from "../apis/Orders/order_index";
import { getOrderById, getUserOrders } from "../apis/Orders/user_order";

export const orderRepo = {
  placeOrder: async (cartItems, userId, token) => {

    try {
      const total = parseFloat(
        cartItems
          .reduce((sum, item) => {
          return  sum + item.price * item.quantity;
          }, 0)
      );

      if (isNaN(total) || total <= 0) {
        throw new Error("Invalid total value calculated");
      }

      const orderData = await createOrders(userId, token, total);

      if (!orderData) {
        throw new Error("Failed to get order ID from server");
      }

      const orderId = orderData.documentId;
      const orderItemIds = [];

      for (const item of cartItems) {
        try {
          const result = await addOrderItem({
            orderId: orderId,
            productId: item.documentId,
            quantity: item.quantity,
            price: item.price, 
            size: item.size,
            userId: userId,
            token: token,
          });

          if (result && result.data && result.data.documentId) {
            orderItemIds.push(result.data.documentId);
          }
        } catch (itemError) {
          console.error(
            `Error adding item ${item.documentId} to order:`,
            itemError
          );
        }
      }

      if (orderItemIds.length === 0) {
        return {
          success: true,
          orderId,
          warning: "No items were added to the order",
        };
      }

      return { success: true, orderId, total };
    } catch (error) {
      console.error("Error in placeOrder:", error);
      throw error;
    }
  },

  updateItems: async (orderId, orderItemIds, token, total) => {
    return await updateOrderWithItems(orderId, orderItemIds, token, total);
  },

  getOrder: async (userId, token) => {
    return await getUserOrders(userId, token);
  },

  getOrderDetailsById: async (orderId, token) => {
    return await getOrderById(orderId, token);
  },
};
