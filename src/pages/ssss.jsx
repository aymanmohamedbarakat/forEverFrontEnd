import React, { useEffect, useState } from "react";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { domain } from "../store";
import { useAuthStore } from "../Hooks/authStore";

export default function OrderPage() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currency = "$"; // You might want to pull this from your store

  // Function to fetch orders
  const fetchOrders = async () => {
    if (!currentUser || !authToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${domain}/api/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          populate: "*",
          filters: {
            users_permissions_user: {
              id: {
                $eq: currentUser.id,
              },
            },
          },
        },
      });

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        response.data.data.map(async (order) => {
          const itemsResponse = await axios.get(`${domain}/api/order-items`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              populate: "products",
              filters: {
                order: {
                  id: {
                    $eq: order.id,
                  },
                },
              },
            },
          });

          return {
            ...order,
            items: itemsResponse.data.data,
          };
        })
      );

      setOrders(ordersWithItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser, authToken]);

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { text: "Pending", color: "bg-yellow-500" },
      processing: { text: "Processing", color: "bg-blue-500" },
      shipped: { text: "Shipped", color: "bg-purple-500" },
      delivered: { text: "Delivered", color: "bg-green-500" },
      cancelled: { text: "Cancelled", color: "bg-red-500" },
    };
    return statusMap[status?.toLowerCase()] || { text: "Pending", color: "bg-yellow-500" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentMethodDisplay = (method) => {
    const paymentMethodInfo = {
      stripe: { text: "Stripe", color: "text-blue-500" },
      razorpay: { text: "Razorpay", color: "text-green-500" },
      cod: { text: "Cash on Delivery", color: "text-gray-500" },
    };
    const payment =
      paymentMethodInfo[method?.toLowerCase()] || paymentMethodInfo["cod"];
    return (
      <div className={`flex items-center ${payment.color}`}>
        <span>{payment.text}</span>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center py-20">
          <p className="text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center py-20">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center py-20">
          <p className="text-lg mb-4">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate("/shopping")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-6 mt-4">
        {orders.map((order, index) => {
          const statusInfo = getStatusInfo(order.order_status);
          return (
            <div
              className="py-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden"
              key={order.id}
            >
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-3 bg-red-50 border-b border-gray-300">
                <div>
                  <p className="font-medium">
                    Order #{order.documentId ? order.documentId.substring(0, 8) : `ORD-${index + 1}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 mr-4">
                    {getPaymentMethodDisplay(order.payment_method || "cod")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${statusInfo.color}`}
                    ></span>
                    <span className="text-sm">{statusInfo.text}</span>
                  </div>
                </div>
              </div>

              {/* Order items */}
              <div className="divide-y divide-gray-200">
                {order.items && order.items.map((item) => {
                  // For each order item, get its products
                  const productDetails = item.products && item.products.length > 0 
                    ? item.products[0] 
                    : null;
                  
                  return (
                    <div
                      key={item.id}
                      className="py-4 px-6 flex items-start gap-4"
                    >
                      <img
                        className="w-16 sm:w-20 object-cover"
                        src={productDetails?.image || "/placeholder.svg"}
                        alt=""
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 sm:text-base font-medium">
                          {productDetails?.name || "Product Name"}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {productDetails?.price || 0}
                          </p>
                          <p className="text-sm">
                            Quantity: {item.quantity || 1}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                            Size: {item.size || "M"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center border-t border-gray-200 bg-gray-50 py-4 px-6">
                <div>
                  <p className="text-sm text-gray-600 sm:text-base font-medium">
                    Total: {currency} {order.total_price || calculateTotal(order.items)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items?.length || 0}{" "}
                    {(order.items?.length || 0) === 1 ? "item" : "items"}
                  </p>
                </div>
                <button className="border px-5 py-2 text-sm font-medium rounded-sm hover:bg-gray-100">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to calculate total if not provided by API
function calculateTotal(items) {
  if (!items || items.length === 0) return 0;
  
  return items.reduce((total, item) => {
    const productPrice = item.products && item.products.length > 0 
      ? item.products[0].price || 0 
      : 0;
    return total + (productPrice * (item.quantity || 1));
  }, 0);
}