// import axios from "axios";
// import { domain } from "../../../store";

// export const getUserOrders = async (userId, token) => {
//   try {
//     if (!userId || !token) {
//       throw new Error("User ID or token is missing");
//     }

//     const res = await axios.get(`${domain}/api/orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         populate: "*",
//         filters: {
//           users_permissions_user: {
//             id: {
//               $eq: userId,
//             },
//           },
//         },
//         populate: {
//           order_item: {
//             populate: "*",
//           },
//         },
//       },

//       // params: {
//       //   // Use the correct field name (singular)
//       //   populate: ["order_item", "order_item.product"],
//       //   filters: {
//       //     users_permissions_user: {
//       //       id: {
//       //         $eq: userId,
//       //       },
//       //     },
//       //   },
//       // },
//       // params: {
//       //   populate: {
//       //     product: {
//       //       populate: "*",
//       //     },
//       //     filters: {
//       //       users_permissions_user: {
//       //         id: {
//       //           $eq: userId,
//       //         },
//       //       },
//       //     },
//       //   },
//       // },
//       //   params: {
//       //     // Use the correct field name (singular)
//       //     populate: ["order_item", "order_item.product"],
//       //     filters: {
//       //       users_permissions_user: {
//       //         id: {
//       //           $eq: userId,
//       //         },
//       //       },
//       //     },
//       //   },
//     });
//     if (res.data && res.data.data) {
//       return Array.isArray(res.data.data)
//         ? res.data.data.map((order) => ({
//             id: order.id,
//             ...order.attributes,
//             order_item: order.attributes.order_item.data.map((item) => ({
//               id: item.id,
//               quantity: item.attributes.quantity,
//               size: item.attributes.size,
//               product: item.attributes.product.data?.attributes || null,
//             })),
//           }))
//         : [];
//     }
//     console.log("res data:", res.data);
//     return [];
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     throw error;
//   }
// };

// export const getOrderItems = async (orderId, token) => {
//   try {
//     const itemsRes = await axios.get(`${domain}/api/order-items`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         populate: "*",
//         filters: {
//           order: {
//             id: {
//               $eq: orderId,
//             },
//           },
//         },
//         populate: {
//           product: {
//             populate: "*",
//           },
//         },
//       },
//     });
//     if (itemsRes.data && itemsRes.data.data) {
//       return Array.isArray(itemsRes.data.data)
//         ? itemsRes.data.data.map((item) => ({
//             id: item.id,
//             ...item.attributes,
//           }))
//         : [];
//     }
//     // return [];
//   } catch (error) {
//     console.error(`Error fetching items for order ${orderId}:`, error);
//     throw error;
//   }
// };

// export const getOrderById = async (orderId, token) => {
//   try {
//     const orderIdRes = await axios.get(`${domain}/api/order-items/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         populate: "*",
//         order_item: {
//           product: {
//             populate: "*",
//           },
//         },
//       },
//     });
//     if (orderIdRes.data && orderIdRes.data.data) {
//       return {
//         id: orderIdRes.data.data.id,
//         ...orderIdRes.data.data.attributes,
//         order_item: orderIdRes.data.data.attributes.order_item.data.map(
//           (item) => ({
//             id: item.id,
//             quantity: item.attributes.quantity,
//             size: item.attributes.size,
//             product: item.attributes.product.data?.attributes || null,
//           })
//         ),
//       };
//     }
//     console.log("res data:", orderIdRes.data);
//     // If the response is not in the expected format, return an empty array
//     return [];
//   } catch (error) {
//     console.error(`Error fetching order by ID ${orderId}:`, error);
//     throw error;
//   }
// };
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// import axios from "axios";
// import { domain } from "../../../store";

// export const getUserOrders = async (userId, token) => {
//   try {
//     if (!userId || !token) {
//       throw new Error("User ID or token is missing");
//     }

//     const res = await axios.get(`${domain}/api/orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         filters: {
//           users_permissions_user: {
//             id: {
//               $eq: userId,
//             },
//           },
//         },
//         populate: {
//           order_items: {
//             populate: {
//               //   product: "*",
//               // populate: ["image"],
//               product: {
//                 populate: ["image"],
//                 // populate: "*",
//               },
//             },
//           },
//         },
//       },
//     });

//     // if (res.data && res.data.data) {
//     //   return res.data.data.map((order) => ({
//     //     id: order.id,
//     //     ...order.attributes,
//     //     order_items: order.attributes.order_items.data.map((item) => ({
//     //       id: item.id,
//     //       quantity: item.attributes.quantity,
//     //       size: item.attributes.size,
//     //       product: item.attributes.product.data?.attributes || null,
//     //     })),
//     //   }));
//     // }
//     if (res.data && res.data.data) {
//         return res.data.data
//         .filter((order) => Array.isArray(order.order_items) && order.order_items.length > 0)
//         .map((order) => ({
//           id: order.id,
//           ...order,
//           order_status: order.attributes?.order_status || "pending",
//           order_items: order.order_items.map((item) => ({
//             id: item.id,
//             quantity: item.quantity,
//             size: item.size,
//             product: item.product || null,
//           })) || [],
//         }));
//     }

//     console.log("API Response:", JSON.stringify(res.data, null, 2));
//     return [];
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     throw error;
//   }
// };

// export const getOrderItems = async (orderId, token) => {
//   try {
//     const itemsRes = await axios.get(`${domain}/api/order-items`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         filters: {
//           order: {
//             id: {
//               $eq: orderId,
//             },
//           },
//         },
//         populate: {
//         //   product: "*",
//             product: {
//                 populate: ["image"],
//             },
//         },
//       },
//     });

//     if (itemsRes.data && itemsRes.data.data) {
//         return itemsRes.data.data
//           .filter((item) => item && item.attributes) // Filter out any null items
//           .map((item) => ({
//             id: item.id,
//             ...item.attributes,
//             product: item.attributes?.product?.data?.attributes || null,
//           }));
//       }
//     return [];
//   } catch (error) {
//     console.error(`Error fetching items for order ${orderId}:`, error);
//     throw error;
//   }
// };

// export const getOrderById = async (orderId, token) => {
//   try {
//     const orderIdRes = await axios.get(`${domain}/api/orders/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         populate: {
//           order_items: {
//             populate: {
//               product: {
//                 populate: ["image"],
//                 // populate: "*",
//               },
//             },
//           },
//         },
//       },
//     });



//     if (orderIdRes.data && orderIdRes.data.data) {
//       return {
//         id: orderData.id,
//         ...orderData.attributes,
//         order_status: orderData.attributes?.order_status || "pending",
//         order_items:
//           orderData.attributes?.order_item?.data?.map((item) => ({
//             id: item.id,
//             quantity: item.attributes?.quantity || 1,
//             size: item.attributes?.size,
//             product: item.attributes?.product?.data?.attributes || null,
//           })) || [],
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error fetching order by ID ${orderId}:`, error);
//     throw error;
//   }
// };

// last update before claudi
////////////////////////////////////////////////////////////

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
        "populate[order_item][populate][product]": "*", // Using order_item (singular) to match Strapi schema
        "populate[order_item][populate][product][populate]": "image",
      },
    });

    if (res.data && res.data.data) {
      // Add proper null checks for each order
      return res.data.data
        .filter((order) => order && order.attributes) // Filter out any null or invalid orders
        .map((order) => ({
          id: order.id,
          ...order.attributes,
          order_status: order.attributes?.order_status || "pending",
        //   total: order.attributes?.total || 0,
          order_items:
            order.attributes?.order_item?.data?.map((item) => ({
              id: item.id,
              quantity: item.attributes?.quantity || 1,
              size: item.attributes?.size,
              product: item.attributes?.product?.data?.attributes || null,
            })) || [],
        }));
    }
    // Add this right after getting the response in getUserOrders
    console.log("API Response:", JSON.stringify(res.data, null, 2));
    return [];
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
        "filters[order][id][$eq]": orderId,
        "populate[product]": "*",
        "populate[product][populate]": "image",
      },
    });

    if (itemsRes.data && itemsRes.data.data) {
      return itemsRes.data.data
        .filter((item) => item && item.attributes) // Filter out any null items
        .map((item) => ({
          id: item.id,
          ...item.attributes,
          product: item.attributes?.product?.data?.attributes || null,
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
    const orderRes = await axios.get(`${domain}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        "populate[order_item][populate][product]": "*", // Using order_item (singular) to match Strapi schema
        "populate[order_item][populate][product][populate]": "image",
      },
    });

    if (orderRes.data && orderRes.data.data) {
      const orderData = orderRes.data.data;
      // Check if orderData and its attributes exist
      if (!orderData || !orderData.attributes) {
        console.error("Order data or attributes missing:", orderData);
        return null;
      }

      return {
        id: orderData.id,
        ...orderData.attributes,
        order_status: orderData.attributes?.order_status || "pending",
        // total: orderData.attributes?.total || 0,
        order_items:
          orderData.attributes?.order_item?.data?.map((item) => ({
            id: item.id,
            quantity: item.attributes?.quantity || 1,
            size: item.attributes?.size,
            product: item.attributes?.product?.data?.attributes || null,
          })) || [],
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching order by ID ${orderId}:`, error);
    throw error;
  }
};
