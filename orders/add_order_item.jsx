import axios from "axios";
import { domain } from "../../store";

export const addOrderItem = async (
  orderId,
  productId,
  quantity,
  size,
  token
) => {
  try {

    const payload = {
      data: {
        orders: orderId,  
        product: productId,
        quantity: quantity || 1,
        size: size || "M"
      },
    };

    console.log("Adding order item with payload:", JSON.stringify(payload));

    const response = await axios.post(`${domain}/api/order-items`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log("Order item added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding order item:", error);
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data));

      // Log more detailed error information if available
      if (error.response.data && error.response.data.error) {
        console.error("Error details:", error.response.data.error);
      }
    }
    throw error;
  }
};