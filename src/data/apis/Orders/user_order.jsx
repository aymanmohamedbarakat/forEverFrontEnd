import axios from "axios";
import { domain } from "../../../store";

export const getUserOrders = async (userId, token) => {
  try {
    if (!userId || !token) {
      throw new Error("User ID or token is missing");
    }

    const res = await axios.get(`${domain}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        "filters[users_permissions_user][id][$eq]": userId,
        populate: "*",
        "populate[order_items][populate][products]": "*",
        "populate[order_items][populate][products][populate]": "image",
      },
    });

    console.log("API Response:", JSON.stringify(res.data, null, 2));

    return res.data.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const getOrderItems = async (orderId, token) => {
  try {
    const itemsRes = await axios.get(`${domain}/api/order-items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        "populate[order_items][populate][products]": "*",
        "populate[order_items][populate][products][populate]": "image",
      },
    });

    if (
      orderRes.data &&
      orderRes.data.data &&
      orderRes.data.data.attributes &&
      orderRes.data.data.attributes.order_items
    ) {
      return orderRes.data.data.attributes.order_items.data.map((item) => ({
        id: item.id,
        ...item.attributes,
        products:
          item.attributes?.products?.data?.map((product) => ({
            id: product.id,
            ...product.attributes,
          })) || [],
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching items for order ${orderId}:`, error);
    throw error;
  }
};

export const getOrderById = async (orderId, token) => {
  try {
    if (!orderId || !token) {
      throw new Error("Order ID or token is missing");
    }

    const orderRes = await axios.get(`${domain}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: "*", // Start with a simple populate
        "populate[order_items][populate]": "*",
        "populate[order_items][populate][products][populate]": "image",
      },
    });

    return orderRes.data.data;
  } catch (error) {
    console.error(`Error fetching order by ID ${orderId}:`, error);
    throw error;
  }
};
