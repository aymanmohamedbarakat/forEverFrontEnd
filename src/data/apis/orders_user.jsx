import axios from "axios";
import { domain } from "../../store";

export const getOrders = async (userId, token) => {
  try {
    if (!userId || !token) {
      throw new Error("User authentication required");
    }

    const response = await axios.get(`${domain}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: "*",
        filters: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
        },
      },
    });
    if (response.data && response.data.data) {
      return Array.isArray(response.data.data)
        ? response.data.data.map((order) => ({
            ...order.attributes,
            id: order.id,
          }))
        : [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrderItems = async (orderId, token) => {
  try {
    const itemsResponse = await axios.get(`${domain}/api/order-items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: {
          products: {
            populate: ["image"],
          },
          orders: true, 
        },
        filters: {
          orders: {
            id: {
              $eq: orderId,
            },
          },
        },
      },
    });
    if (itemsResponse.data && itemsResponse.data.data) {
      return Array.isArray(itemsResponse.data.data)
        ? itemsResponse.data.data.map((item) => ({
            ...item.attributes,
            id: item.id,
          }))
        : [];
    }

    return [];
  } catch (error) {
    console.error(`Error fetching items for order ${orderId}:`, error);
    throw error;
  }
};

export const getOrderById = async (orderId, token) => {
  try {
    const orderResponse = await axios.get(`${domain}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: "*",
      },
    });

    if (orderResponse.data && orderResponse.data.data) {
      const orderData = orderResponse.data.data;
      return {
        ...orderData.attributes,
        id: orderData.id,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};
