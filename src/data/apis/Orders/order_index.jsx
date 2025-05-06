import axios from "axios";
import { domain } from "../../../store";

export const createOrders = async (userId, token, total) => {
  try {
    const res = await axios.post(
      `${domain}/api/orders`,
      {
        data: {
          users_permissions_user: userId,
          order_status: "pending",
          total: total,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data && res.data.data) {
      return res.data.data;
    } else {
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error("❌ Error creating order:", error);
    throw error;
  }
};

export const addOrderItem = async ({
  orderId,
  productId,
  userId,
  token,
  quantity = 1,
  size = null,
}) => {
  try {
    const res = await axios.post(
      `${domain}/api/order-items`,
      {
        data: {
          products: [productId],
          order: orderId,
          users_permissions_user: userId,
          quantity: quantity || 1,
          size: size || null,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error adding order item:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Failed to add item to order"
    );
  }
};

export const updateOrderWithItems = async (
  orderId,
  orderItemIds,
  token,
  total
) => {
  try {
    const res = await axios.put(
      `${domain}/api/orders/${orderId}`,
      {
        data: {
          order_items: orderItemIds,
          total: Number(total),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Failed to update order with items"
    );
  }
};
