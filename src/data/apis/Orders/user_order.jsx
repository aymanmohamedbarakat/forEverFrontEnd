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
        filter: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
        },
        populate: {
          order_items: {
            populate: {
              products: {
                populate: "*",
              },
            },
          },
        },
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
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
        populate: "*",
        populate: {
          order_items: {
            populate: {
              populate: "*",
            },
          },
        },
        populate: {
          order_items: {
            populate: {
              products: {
                populate: "*",
              },
            },
          },
        },
      },
    });
    return orderRes.data.data;
  } catch (error) {
    console.error(`Error fetching order by ID ${orderId}:`, error);
    throw error;
  }
};
