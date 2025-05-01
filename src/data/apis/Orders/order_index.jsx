// working
////////////////////////////////////////////////////////////
// import axios from "axios";
// import { domain } from "../../../store";

// export const createOrders = async (
//   userId,
//   token,
//   addressInformation = null,
//   formData = {},
//   paymentMethod = "cod"
// ) => {
//   try {
//     console.log("Creating order with params:", { userId, domain });

//     // API call to create an order with more details
//     const res = await axios.post(
//       `${domain}/api/orders`,
//       {
//         data: {
//           users_permissions_user: userId,
//           order_status: "pending",
//           // total: 0, // Will be updated after adding items
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Order creation response:", res.data);

//     if (res.data && res.data.data) {
//       return res.data.data;
//     } else {
//       console.error("Unexpected response format:", res.data);
//       throw new Error("Invalid response format from server");
//     }
//   } catch (error) {
//     console.error("❌ Error creating order:", error);
//     if (error.response) {
//       console.error("Response data:", JSON.stringify(error.response.data));
//     }
//     throw error;
//   }
// };

// export const addOrderItem = async ({
//   orderId,
//   productId,
//   userId,
//   token,
//   quantity = 1,
//   size = null,
// }) => {
//   try {
//     console.log("Adding order item with params:", {
//       productId,
//       orderId,
//       userId,
//       quantity,
//       size,
//     });

//     const res = await axios.post(
//       `${domain}/api/order-items`,
//       {
//         data: {
//           product: productId,
//           order: orderId,
//           users_permissions_user: userId,
//           quantity: quantity || 1,
//           size: size || null,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Order item added:", res.data);
//     return res.data;
//   } catch (error) {
//     console.error(
//       "Error adding order item:",
//       error.response?.data || error.message
//     );
//     throw new Error(
//       error.response?.data?.error?.message ||
//         error.message ||
//         "Failed to add item to order"
//     );
//   }
// };
////////////////////////
///////////////////////////////////////////

import axios from "axios";
import { domain } from "../../../store";
export const createOrders = async (
  userId,
  token,
  addressInformation = null,
  formData = {},
  paymentMethod = "cod"
) => {
  try {
    console.log("Creating order with params:", { userId, domain });

    // API call to create an order with more details
    const res = await axios.post(
      `${domain}/api/orders`,
      {
        data: {
          users_permissions_user: userId,
          order_status: "pending",
          // total: 0, // Will be updated after adding items
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Order creation response:", res.data);

    if (res.data && res.data.data) {
      return res.data.data;
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

export const addOrderItem = async ({
  orderId,
  productId,
  userId,
  token,
  quantity = 1,
  size = null,
}) => {
  try {
    console.log("Adding order item with params:", {
      productId,
      orderId,
      userId,
      quantity,
      size,
    });

    const res = await axios.post(
      `${domain}/api/order-items`,
      {
        data: {
          products: productId,
          // products: productsArray,
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
    console.log("Order item added:", res.data);
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

export const updateOrderWithItems = async (orderId, orderItemIds, token) => {
  try {
    console.log("Updating order with order items:", {
      orderId,
      orderItemIds,
    });

    const itemsArray = Array.isArray(orderItemIds)
      ? orderItemIds
      : [orderItemIds];

    const res = await axios.put(
      `${domain}/api/orders/${orderId}`,
      {
        data: {
          order_items: itemsArray,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order updated with items:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error updating order with items:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Failed to update order with items"
    );
  }
};
