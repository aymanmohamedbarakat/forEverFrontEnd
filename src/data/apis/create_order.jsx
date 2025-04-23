import axios from "axios";
import { domain } from "../../store";

export const createOrder = async (userId, token) => {
  try {
    const payload = {
      data: {
        users_permissions_user: userId, 
        order_status: "pending",

      },
    };

    console.log("Creating order with payload:", JSON.stringify(payload));

    const res = await axios.post(`${domain}/api/orders`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        populate: "*",
      },
    });

    console.log("Order creation response:", res.data);

    if (res.data && res.data.data && res.data.data.id) {
      return res.data.data.id;
    } else {
      console.error("Unexpected response format:", res.data);
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error("❌ Error creating order:", error);
    if (error.response) {
      console.error("Response data:", JSON.stringify(error.response.data));
    }
    throw error;
  }
};
