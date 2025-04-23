import React, { useEffect, useState } from "react";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Hooks/authStore";
import { currency, domain } from "../store";
import { OrderRepo } from "../data/Repo/OrderRepo";

export default function OrderPage() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!currentUser || !authToken) {
      setLoading(false);
      return;
    }

    try {
      const ordersData = await OrderRepo.getUserOrders(
        currentUser.id,
        authToken
      );
      console.log("Processed orders data:", ordersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
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
    return (
      statusMap[status?.toLowerCase()] || {
        text: "Pending",
        color: "bg-yellow-500",
      }
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  const processOrders = () => {
    const organizedOrders = [];
    if (orders && orders.length > 0 && orders[0].orders) {
      orders.forEach((item) => {
        const orderInfo = item.orders && item.orders[0];

        if (orderInfo) {
          const existingOrderIndex = organizedOrders.findIndex(
            (o) => o.documentId === orderInfo.documentId
          );

          const orderItem = {
            id: item.id,
            documentId: item.documentId,
            quantity: item.quantity,
            size: item.size,
            createdAt: item.createdAt,
            product: item.products && item.products[0],
          };

          if (existingOrderIndex >= 0) {
            organizedOrders[existingOrderIndex].items.push(orderItem);
          } else {
            organizedOrders.push({
              id: orderInfo.id,
              documentId: orderInfo.documentId,
              total_price: orderInfo.total_price,
              createdAt: orderInfo.createdAt || item.createdAt,
              order_status: orderInfo.order_status,
              payment_method: orderInfo.payment_method || "cod",
              items: [orderItem],
            });
          }
        }
      });

      return organizedOrders;
    }
    return orders;
  };

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

  const processedOrders = processOrders();

  if (!processedOrders || processedOrders.length === 0) {
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
    <div className="border-t border-gray-300 pt-16 pb-16 max-w-6xl mx-auto px-4">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-6 mt-4">
        {processedOrders.map((order, index) => {
          const statusInfo = getStatusInfo(order.order_status);
          const orderItems = order.items || [];
          const totalPrice =
            order.total_price || OrderRepo.calculateOrderTotal(orderItems);
          const orderId = order.id || `order-${index}`;
          const displayId = order.documentId
            ? order.documentId.substring(0, 8)
            : orderId.toString().substring(0, 8);

          return (
            <div
              className="border border-gray-300 rounded-lg shadow-sm overflow-hidden"
              key={orderId}
            >
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-3 bg-red-50 border-b border-gray-300">
                <div>
                  <p className="font-medium">Order #{displayId}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
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
                {orderItems && orderItems.length > 0 ? (
                  orderItems.map((item, itemIndex) => {
                    const product = item.product || {};
                    let imageUrl = "";
                    if (product && product.image && product.image.length > 0) {
                      const mainImage = product.image[0];
                      if (mainImage) {
                        imageUrl = mainImage.formats?.thumbnail?.url
                          ? `${domain}${mainImage.formats.thumbnail.url}`
                          : mainImage.url
                          ? `${domain}${mainImage.url}`
                          : "";
                      }
                    }

                    return (
                      <div
                        key={item.id || `item-${itemIndex}`}
                        className="py-4 px-6 flex items-start gap-4"
                      >
                        {imageUrl ? (
                          <img
                            className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                            src={imageUrl}
                            alt={product.name || "Product image"}
                          />
                        ) : (
                          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 flex items-center justify-center rounded">
                            <span className="text-gray-500 text-xs">
                              No image
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 sm:text-base font-medium">
                            {product.name || "Product Name"}
                          </p>
                          <p className="text-lg font-semibold">
                            {currency}
                            {product.price || 0}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-gray-700">
                            <p>Quantity: {item.quantity || 1}</p>
                            {item.size && (
                              <p className="px-2 py-1 border bg-slate-50 rounded">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-4 px-6 text-center text-gray-500">
                    No items in this order
                  </div>
                )}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center border-t border-gray-200 bg-gray-50 py-4 px-6">
                <div>
                  <p className="text-sm text-gray-600 sm:text-base font-medium">
                    Total:{" "}
                    <span className="font-semibold">
                      {currency} {totalPrice}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {orderItems.length}{" "}
                    {orderItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <button className="border border-gray-300 bg-white px-5 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
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
