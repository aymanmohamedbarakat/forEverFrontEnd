import React, { useEffect, useState } from "react";
import { orderRepo } from "../data/Repo/OrderRepo";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title/Title";
import { currency, domain, useAuthStore } from "../store";

export default function Order() {
  const navigate = useNavigate();
  const { currentUser, authToken } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-400", text: "Pending" },
      processing: { color: "bg-blue-400", text: "Processing" },
      shipped: { color: "bg-purple-400", text: "Shipped" },
      delivered: { color: "bg-green-400", text: "Delivered" },
      cancelled: { color: "bg-red-400", text: "Cancelled" },
    };

    return statusMap[status?.toLowerCase()] || statusMap.pending;
  };

  useEffect(() => {
    async function getOrders() {
      try {
        if (!currentUser || !authToken) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await orderRepo.getOrder(currentUser.id, authToken);
        setOrders(response);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to fetch orders");
        setLoading(false);
      }
    }
    getOrders();
  }, [currentUser, authToken]);

  if (loading)
    return <div className="text-center py-20">Loading orders...</div>;
  if (error) return <div className="text-center py-20">Error: {error}</div>;

  if (orders.length === 0) {
    return (
      <div className="border-t  border-gray-200 pt-16">
        <div className="text-xl sm:text-2xl my-3">
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
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6 mt-4">
        {orders.map((order, index) => {
          const statusInfo = getStatusInfo(order.order_status);
          return (
            <div
              key={order.id || index}
              className="py-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-3 bg-red-50 border-b border-gray-300">
                <div>
                  <p className="font-medium">
                    Order #{order.id || `ORD-${index + 1}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
                {order.order_items &&
                  order.order_items.map((item, itemIndex) => (
                    <div
                      key={item.id || `item-${itemIndex}`}
                      className="py-4 px-6 flex items-start gap-4"
                    >
                      <img
                        className="w-16 sm:w-20 object-cover"
                        src={
                          item.products &&
                          item.products.length > 0 &&
                          item.products[0].image &&
                          item.products[0].image.length > 0
                            ? domain + item.products[0].image[0].url
                            : "/placeholder.svg"
                        }
                        alt={
                          item.products && item.products.length > 0
                            ? item.products[0].name
                            : "Product"
                        }
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 sm:text-base font-medium">
                          {item.products && item.products.length > 0
                            ? item.products[0].name
                            : "Product"}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {item.products && item.products.length > 0
                              ? item.products[0].price || 0
                              : 0}
                          </p>
                          <p className="text-sm">
                            Quantity: {item.quantity || 1}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                            Size: {item.size || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center border-t border-gray-200 bg-gray-50 py-4 px-6">
                <div>
                  <p className="text-sm text-gray-600 sm:text-base font-medium">
                    Total: {currency} {order.total || 0}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.order_items ? order.order_items.length : 0} item
                    {order.order_items && order.order_items.length !== 1
                      ? "s"
                      : ""}
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
