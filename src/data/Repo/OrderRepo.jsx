import { toast } from "react-toastify";
import { createOrder } from "../apis/create_order";
import { addOrderItem } from "../apis/add_order_item";
import { getOrderById, getOrderItems, getOrders } from "../apis/orders_user";

export const OrderRepo = {
  placeOrder: async (userId, cartItems, token, address = {}) => {
    try {
      const orderId = await createOrder(userId, token, address);
      if (!orderId) {
        throw new Error("Failed to create order");
      }
      console.log("Order created with ID:", orderId);
      for (const item of cartItems) {
        console.log("Adding item to order:", item);
        await addOrderItem(
          orderId,
          item.productId,
          item.quantity,
          item.size,
          token
        );
      }

      toast.success("Order placed successfully!");
      return { success: true, orderId };
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
      return { success: false, error: error.message };
    }
  },

  getUserOrders: async (userId, token) => {
    try {
      console.log("Fetching orders for user:", userId);
      const orders = await getOrders(userId, token);
      console.log("Raw orders response:", orders);

      if (!Array.isArray(orders)) {
        console.error("Expected orders to be an array, got:", typeof orders);
        return [];
      }

      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          try {
            console.log(`Fetching items for order ${order.id}`);
            const orderItems = await getOrderItems(order.id, token);
            console.log(`Items for order ${order.id}:`, orderItems);

            return {
              ...order,
              items: Array.isArray(orderItems) ? orderItems : [],
            };
          } catch (itemError) {
            console.error(
              `Error fetching items for order ${order.id}:`,
              itemError
            );
            return {
              ...order,
              items: [],
            };
          }
        })
      );

      return ordersWithItems;
    } catch (error) {
      console.error("Error in getUserOrders:", error);
      toast.error("Failed to load orders");
      return [];
    }
  },

  getOrderDetails: async (orderId, token) => {
    try {
      const order = await getOrderById(orderId, token);
      const orderItems = await getOrderItems(orderId, token);

      return {
        ...order,
        items: orderItems || [],
      };
    } catch (error) {
      console.error(`Error in getOrderDetails:`, error);
      toast.error("Failed to load order details");
      return null;
    }
  },

  calculateOrderTotal: (items) => {
    if (!items || items.length === 0) return 0;

    return items
      .reduce((total, item) => {
        const product = item.product || (item.products && item.products[0]);
        const price = product ? product.price || 0 : 0;
        return total + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  },
};
